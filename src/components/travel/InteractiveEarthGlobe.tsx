"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Compass, RotateCcw, ZoomIn, ZoomOut, Home } from "lucide-react";
import { Destination, HomeBase, HOME_BASE } from "@/data/travelData";

interface InteractiveEarthGlobeProps {
  destinations?: Destination[];
  homeBase?: HomeBase;
  selectedDestination?: Destination | null;
  onSelectDestination?: (destination: Destination | null) => void;
  onOpenJournal?: (destination: Destination) => void;
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Mathematically Verified Geographic Coordinate Conversion
// ─────────────────────────────────────────────────────────────────────────────
// Maps Lat/Lon (degrees) to 3D Cartesian coordinates on a sphere matching
// Three.js SphereGeometry equirectangular UV mapping:
// u = (lon + 180) / 360  ->  lon 0° (u=0.5) is +X, lon +90°E (u=0.75) is -Z
// v = (lat + 90) / 180   ->  lat +90°N (v=1.0) is +Y
export function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Spherical geodesic arc generator with parabolic elevation above the Earth surface
export function createGeodesicPoints(
  startVec: THREE.Vector3,
  endVec: THREE.Vector3,
  baseRadius: number,
  numPoints: number = 22
): THREE.Vector3[] {
  return createCurvedRoutePoints(startVec, endVec, baseRadius, numPoints, 0, 0.08);
}

// ─────────────────────────────────────────────────────────────────────────────
// Tailored 3D Geodesic Arc Profiles with Lateral Bowing (Zero Overlaps)
// ─────────────────────────────────────────────────────────────────────────────
export interface RouteProfile {
  lateralBow: number; // Bows sideways relative to chord vector (tangent to sphere)
  peakAltitude: number; // Elevation above globe at midpoint
  dotCount: number; // Number of discrete golden spheres
}

export const ROUTE_PROFILES: Record<string, RouteProfile> = {
  "dest-coxs-bazar": {
    lateralBow: -0.026, // Curves gracefully southwest over the Bay of Bengal coastline
    peakAltitude: 0.16,
    dotCount: 16,
  },
  "dest-chittagong": {
    lateralBow: 0.016, // Curves east toward the Chittagong Hill Tracts
    peakAltitude: 0.11,
    dotCount: 11,
  },
  "dest-patenga-beach": {
    lateralBow: -0.016, // Curves west over the port waters, cleanly separating from Chittagong
    peakAltitude: 0.10,
    dotCount: 10,
  },
  "dest-cumilla": {
    lateralBow: 0.011, // Short crisp curve east
    peakAltitude: 0.065,
    dotCount: 6,
  },
  "dest-sreemangal": {
    lateralBow: 0.014, // Curves northeast into the rolling tea gardens
    peakAltitude: 0.085,
    dotCount: 8,
  },
  "dest-sylhet": {
    lateralBow: 0.018, // High sweeping arc to northeastern Surma basin
    peakAltitude: 0.12,
    dotCount: 12,
  },
  "dest-mymensingh": {
    lateralBow: 0.012, // Arches north along the Brahmaputra
    peakAltitude: 0.08,
    dotCount: 8,
  },
  "dest-natore": {
    lateralBow: 0.020, // Arches northwest toward the historic palaces
    peakAltitude: 0.11,
    dotCount: 11,
  },
  "dest-pabna": {
    lateralBow: -0.015, // Arches west-southwest across the river basin
    peakAltitude: 0.085,
    dotCount: 9,
  },
};

// Generates an elevated 3D parabolic trajectory with lateral bowing
export function createCurvedRoutePoints(
  startVec: THREE.Vector3,
  endVec: THREE.Vector3,
  baseRadius: number,
  numPoints: number,
  lateralBow: number = 0,
  peakAltitude: number = 0.08
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const u0 = startVec.clone().normalize();
  const u1 = endVec.clone().normalize();

  const chord = endVec.clone().sub(startVec);
  const midNormal = u0.clone().add(u1).normalize();
  // Vector perpendicular to chord and normal, tangent to sphere surface
  const lateralVec = new THREE.Vector3().crossVectors(midNormal, chord).normalize();

  const dot = THREE.MathUtils.clamp(u0.dot(u1), -1, 1);
  const theta = Math.acos(dot);

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    let baseU: THREE.Vector3;
    if (theta < 0.0001) {
      baseU = u0.clone();
    } else {
      const sinTheta = Math.sin(theta);
      const a = Math.sin((1 - t) * theta) / sinTheta;
      const b = Math.sin(t * theta) / sinTheta;
      baseU = u0.clone().multiplyScalar(a).add(u1.clone().multiplyScalar(b)).normalize();
    }

    const curveFactor = Math.sin(t * Math.PI);
    const surfaceElev = baseRadius * 1.018;
    const arcHeight = curveFactor * peakAltitude;

    const pt = baseU.multiplyScalar(surfaceElev + arcHeight);
    pt.add(lateralVec.clone().multiplyScalar(curveFactor * lateralBow));
    points.push(pt);
  }

  return points;
}

// Computes regional 3D globe position for destination markers so that
// the personal travel network from Narsingdi maps out across the visible
// South Asian hemisphere, perfectly matching the design composition
export function getVisualDestinationPosition(
  dest: { id: string; latitude: number; longitude: number },
  homeBase: { latitude: number; longitude: number },
  radius: number
): THREE.Vector3 {
  const SPREAD = 4.0;
  let dLat = (dest.latitude - homeBase.latitude) * SPREAD;
  let dLon = (dest.longitude - homeBase.longitude) * SPREAD;

  if (dest.id === "dest-patenga-beach") {
    // Separate Patenga into port coastline distinct from Chittagong
    dLon -= 1.2;
    dLat -= 0.8;
  }

  const effLat = homeBase.latitude + dLat;
  const effLon = homeBase.longitude + dLon;
  return latLonToVector3(effLat, effLon, radius);
}

// ─────────────────────────────────────────────────────────────────────────────
// Verified Screen Offsets for Destination Labels (Placed Directly at Pins)
// ─────────────────────────────────────────────────────────────────────────────
const LABEL_RADIAL_OFFSETS: Record<string, { x: number; y: number }> = {
  "home-base": { x: -44, y: -14 },
  "dest-mymensingh": { x: 12, y: -12 },
  "dest-sylhet": { x: 12, y: -12 },
  "dest-sreemangal": { x: 12, y: -12 },
  "dest-cumilla": { x: 12, y: -12 },
  "dest-chittagong": { x: 12, y: -12 },
  "dest-patenga-beach": { x: 12, y: -12 },
  "dest-coxs-bazar": { x: 12, y: -12 },
  "dest-pabna": { x: -78, y: -12 },
  "dest-natore": { x: -80, y: -12 },
};

// Initial orientation to face Narsingdi / Bangladesh directly toward camera
const INITIAL_ROTATION_X = 0.417;
const INITIAL_ROTATION_Y = Math.PI - ((90.7177 - 90) * Math.PI) / 180;
const INITIAL_CAMERA_DISTANCE = 4.6;

/**
 * Calculates responsive base camera distance to guarantee the 3D Earth remains
 * centered and stays within its container bounds on all aspect ratios.
 */
export function getResponsiveBaseZoom(w: number, h: number): number {
  if (w <= 0 || h <= 0) return INITIAL_CAMERA_DISTANCE;
  const aspect = w / h;
  if (aspect >= 1.2) return INITIAL_CAMERA_DISTANCE;
  if (aspect >= 1.0) return 4.75;
  if (aspect >= 0.82) return 5.1;
  return 5.45;
}

interface RouteEntry {
  destinationId: string;
  line: THREE.Line;
  dotsMesh: THREE.InstancedMesh;
  dotCount: number;
  pulseMesh: THREE.Mesh;
  arcPoints: THREE.Vector3[];
}

export function InteractiveEarthGlobe({
  destinations = [],
  homeBase = HOME_BASE,
  selectedDestination = null,
  onSelectDestination,
  onOpenJournal: _onOpenJournal,
  className = "",
}: InteractiveEarthGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelElementsRef = useRef<Record<string, HTMLButtonElement | null>>({});

  // Status & live readout states
  const [coordinates, setCoordinates] = useState<{ lat: string; lon: string }>({
    lat: "23.92° N",
    lon: "90.72° E",
  });
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHomeBaseSelected, setIsHomeBaseSelected] = useState<boolean>(false);
  const isReducedMotionRef = useRef<boolean>(false);

  // References to destinations & homeBase to avoid stale closures in animate
  const destinationsRef = useRef(destinations);
  useEffect(() => {
    destinationsRef.current = destinations;
  }, [destinations]);

  const homeBaseRef = useRef(homeBase);
  useEffect(() => {
    homeBaseRef.current = homeBase;
  }, [homeBase]);

  const selectedDestinationRef = useRef(selectedDestination);
  useEffect(() => {
    selectedDestinationRef.current = selectedDestination;
  }, [selectedDestination]);

  // Three.js internal references
  const threeRefs = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    globeGroup: THREE.Group;
    earthMesh: THREE.Mesh;
    cloudsMesh: THREE.Mesh;
    orbitalRing: THREE.Mesh;
    markersGroup: THREE.Group;
    networkArcsGroup: THREE.Group;
    routeEntries: RouteEntry[];
    targetRotation: { x: number; y: number };
    currentRotation: { x: number; y: number };
    targetZoom: number;
    currentZoom: number;
    isUserInteracting: boolean;
    lastMouseX: number;
    lastMouseY: number;
    dragVelocity: { x: number; y: number };
    animFrameId: number;
    isVisible: boolean;
    raycaster: THREE.Raycaster;
    mouseVector: THREE.Vector2;
    markerMeshes: {
      mesh: THREE.Object3D;
      item: { type: "destination"; destination: Destination } | { type: "home-base"; homeBase: HomeBase };
    }[];
  } | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotionRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Synchronize external selected destination
  useEffect(() => {
    if (selectedDestination) {
      setIsHomeBaseSelected(false);
    }
  }, [selectedDestination]);

  // Selection handlers
  const handleSelectHomeBase = useCallback(() => {
    setIsHomeBaseSelected(true);
    if (onSelectDestination) {
      onSelectDestination(null);
    }
  }, [onSelectDestination]);

  const handleSelectDestination = useCallback(
    (dest: Destination | null) => {
      setIsHomeBaseSelected(false);
      if (onSelectDestination) {
        onSelectDestination(dest);
      }
    },
    [onSelectDestination]
  );

  // ───────────────────────────────────────────────────────────────────────────
  // Three.js Scene Setup & Render Loop
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 640;
    const baseZoom = getResponsiveBaseZoom(width, height);

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0, baseZoom);

    // 2. Renderer with proper color management
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
    } catch {
      return;
    }

    // 3. Globe Root Group (all rotating items live inside here!)
    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = INITIAL_ROTATION_X;
    globeGroup.rotation.y = INITIAL_ROTATION_Y;
    scene.add(globeGroup);

    // 4. Earth Sphere & High-Res Textures
    const sphereRadius = 1.92;
    const textureLoader = new THREE.TextureLoader();

    const earthTexture = textureLoader.load("/images/globe/earth-map.jpg");
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const cloudsTexture = textureLoader.load("/images/globe/earth-clouds.png");

    const earthGeo = new THREE.SphereGeometry(sphereRadius, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.85,
      metalness: 0.05,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // 5. Cloud Layer
    const cloudsGeo = new THREE.SphereGeometry(sphereRadius * 1.012, 48, 48);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    globeGroup.add(cloudsMesh);

    // 6. Safe Atmospheric Rim Glow (No negative pow calls, gentle aesthetic)
    const atmosphereGeo = new THREE.SphereGeometry(sphereRadius * 1.14, 48, 48);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float viewDot = dot(vNormal, vec3(0.0, 0.0, 1.0));
          float rim = 1.0 - max(0.0, viewDot);
          float intensity = pow(rim, 2.8);
          vec3 atmosphereColor = mix(vec3(0.83, 0.68, 0.22), vec3(0.18, 0.42, 0.88), 0.35);
          gl_FragColor = vec4(atmosphereColor, intensity * 0.45);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    globeGroup.add(atmosphereMesh);

    // 7. Subtle Golden Orbital Trajectory Ring (Matches Reference Image)
    const ringGeo = new THREE.RingGeometry(sphereRadius * 1.28, sphereRadius * 1.284, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.32,
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI / 2.8;
    orbitalRing.rotation.y = 0.25;
    globeGroup.add(orbitalRing);

    // 8. Distant Celestial Stars
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 280;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 50;
      starPositions[i + 1] = (Math.random() - 0.5) * 50;
      starPositions[i + 2] = -15 - Math.random() * 25;
    }
    starsGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({
      size: 1.2,
      color: 0xd4af37,
      transparent: true,
      opacity: 0.28,
    });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    // 9. Balanced Cinematic Lighting (No blown-out hotspots)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8eb, 1.4);
    sunLight.position.set(3, 4, 5);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x4477bb, 0.6);
    rimLight.position.set(-5, 0, -3);
    scene.add(rimLight);

    // 10. Groups for Markers & Network Arcs
    const markersGroup = new THREE.Group();
    globeGroup.add(markersGroup);

    const networkArcsGroup = new THREE.Group();
    globeGroup.add(networkArcsGroup);

    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    threeRefs.current = {
      scene,
      camera,
      renderer,
      globeGroup,
      earthMesh,
      cloudsMesh,
      orbitalRing,
      markersGroup,
      networkArcsGroup,
      routeEntries: [],
      targetRotation: { x: INITIAL_ROTATION_X, y: INITIAL_ROTATION_Y },
      currentRotation: { x: INITIAL_ROTATION_X, y: INITIAL_ROTATION_Y },
      targetZoom: baseZoom,
      currentZoom: baseZoom,
      isUserInteracting: false,
      lastMouseX: 0,
      lastMouseY: 0,
      dragVelocity: { x: 0, y: 0 },
      animFrameId: 0,
      isVisible: true,
      raycaster,
      mouseVector,
      markerMeshes: [],
    };
    if (typeof window !== "undefined") {
      (window as unknown as { __globeRefs: typeof threeRefs.current }).__globeRefs = threeRefs.current;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Animation Loop
    // ─────────────────────────────────────────────────────────────────────────
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const refs = threeRefs.current;
      if (!refs) return;

      if (refs.isVisible) {
        // Inertia damping when user releases drag
        if (!refs.isUserInteracting) {
          refs.targetRotation.x += refs.dragVelocity.x;
          refs.targetRotation.y += refs.dragVelocity.y;
          refs.dragVelocity.x *= 0.92;
          refs.dragVelocity.y *= 0.92;
        }

        // Clamp vertical tilt to prevent globe inversion
        refs.targetRotation.x = Math.max(-1.1, Math.min(1.1, refs.targetRotation.x));

        // Smooth lerp rotation
        refs.currentRotation.x += (refs.targetRotation.x - refs.currentRotation.x) * 0.1;
        refs.currentRotation.y += (refs.targetRotation.y - refs.currentRotation.y) * 0.1;

        globeGroup.rotation.x = refs.currentRotation.x;
        globeGroup.rotation.y = refs.currentRotation.y;

        // Subtle cloud drift if motion is not reduced
        if (!isReducedMotionRef.current) {
          cloudsMesh.rotation.y += delta * 0.02;
        }

        // Smooth camera zoom lerp
        refs.currentZoom += (refs.targetZoom - refs.currentZoom) * 0.1;
        camera.position.z = refs.currentZoom;

        // Animate traveling pulse packets along the 9 connections
        const animSec = time * 0.001;
        if (refs.routeEntries && refs.routeEntries.length > 0) {
          refs.routeEntries.forEach((entry, idx) => {
            const progress = (animSec * 0.38 + idx * 0.11) % 1.0;
            const ptIdx = Math.floor(progress * (entry.arcPoints.length - 1));
            entry.pulseMesh.position.copy(entry.arcPoints[ptIdx]);
          });
        }

        // Live coordinate calculation based on exact surface normal facing the camera
        const invMatrix = globeGroup.matrixWorld.clone().invert();
        const centerDir = new THREE.Vector3(0, 0, 1).applyMatrix4(invMatrix).normalize();
        const currentLatDeg = 90 - (Math.acos(THREE.MathUtils.clamp(centerDir.y, -1, 1)) * 180) / Math.PI;
        const thetaLon = Math.atan2(centerDir.z, -centerDir.x);
        let currentLonDeg = (thetaLon * 180) / Math.PI - 180;
        if (currentLonDeg < -180) currentLonDeg += 360;
        if (currentLonDeg > 180) currentLonDeg -= 360;

        const latDir = currentLatDeg >= 0 ? "N" : "S";
        const lonDir = currentLonDeg >= 0 ? "E" : "W";
        setCoordinates({
          lat: `${Math.abs(currentLatDeg).toFixed(2)}° ${latDir}`,
          lon: `${Math.abs(currentLonDeg).toFixed(2)}° ${lonDir}`,
        });

        // ─────────────────────────────────────────────────────────────────────
        // Synchronize HTML Location Labels with 3D Globe Rotation
        // ─────────────────────────────────────────────────────────────────────
        const containerW = container.clientWidth;
        const containerH = container.clientHeight;
        const globeWorldCenter = new THREE.Vector3();
        globeGroup.getWorldPosition(globeWorldCenter);

        const updateLabel = (id: string, visualPos: THREE.Vector3) => {
          const el = labelElementsRef.current[id];
          if (!el) return;

          // Compute exact 3D world position
          const worldPos = visualPos.clone().applyMatrix4(globeGroup.matrixWorld);

          // Dot product check against camera line of sight to cull markers behind Earth
          const toCam = camera.position.clone().sub(worldPos).normalize();
          const normal = worldPos.clone().sub(globeWorldCenter).normalize();
          const facing = normal.dot(toCam);

          if (facing > 0.08) {
            // Project 3D coordinate to 2D Screen Space
            const proj = worldPos.clone().project(camera);
            const sx = ((proj.x + 1) / 2) * containerW;
            const sy = ((-proj.y + 1) / 2) * containerH;

            const offset = LABEL_RADIAL_OFFSETS[id] || { x: 12, y: -12 };
            let labelX = sx + offset.x;
            const labelY = sy + offset.y;

            // Soft clamp so labels remain comfortably visible within container bounds on mobile
            const labelEstimatedW = id === "home-base" ? 100 : 76;
            if (labelX < 8) labelX = 8;
            if (labelX + labelEstimatedW > containerW - 8) {
              labelX = Math.max(8, containerW - labelEstimatedW - 8);
            }

            if (labelY > -40 && labelY < containerH + 40) {
              el.style.display = "flex";
              el.style.left = `${Math.round(labelX)}px`;
              el.style.top = `${Math.round(labelY)}px`;
              return;
            }
          }

          el.style.display = "none";
        };

        const currentHb = homeBaseRef.current;
        if (currentHb) {
          const posHb = latLonToVector3(currentHb.latitude, currentHb.longitude, sphereRadius * 1.018);
          updateLabel("home-base", posHb);

          destinationsRef.current.forEach((dest) => {
            const posDest = getVisualDestinationPosition(dest, currentHb, sphereRadius * 1.018);
            updateLabel(dest.id, posDest);
          });
        }

        renderer.render(scene, camera);
      }

      refs.animFrameId = requestAnimationFrame(animate);
    };

    threeRefs.current.animFrameId = requestAnimationFrame(animate);

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);

          if (threeRefs.current) {
            threeRefs.current.targetZoom = getResponsiveBaseZoom(w, h);
          }
        }
      }
    });
    resizeObserver.observe(container);

    // Visibility observer
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        if (threeRefs.current) {
          threeRefs.current.isVisible = entries[0]?.isIntersecting ?? true;
        }
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      if (threeRefs.current) {
        cancelAnimationFrame(threeRefs.current.animFrameId);
        renderer.dispose();
        earthGeo.dispose();
        earthMat.dispose();
        earthTexture.dispose();
        cloudsGeo.dispose();
        cloudsMat.dispose();
        cloudsTexture.dispose();
        atmosphereGeo.dispose();
        atmosphereMat.dispose();
        ringGeo.dispose();
        ringMat.dispose();
        starsGeo.dispose();
        starsMat.dispose();
      }
    };
  }, []);

  // ───────────────────────────────────────────────────────────────────────────
  // Construct 10 3D Markers & 9 Narsingdi-Originated Dotted Connections
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const refs = threeRefs.current;
    if (!refs) return;

    // 1. Clear existing markers
    while (refs.markersGroup.children.length > 0) {
      const child = refs.markersGroup.children[0];
      refs.markersGroup.remove(child);
      if ("geometry" in child) (child as THREE.Mesh).geometry.dispose();
    }
    refs.markerMeshes = [];

    // 2. Clear existing network arcs
    while (refs.networkArcsGroup.children.length > 0) {
      const child = refs.networkArcsGroup.children[0];
      refs.networkArcsGroup.remove(child);
      if ("geometry" in child) (child as THREE.Mesh).geometry.dispose();
    }
    refs.routeEntries = [];

    const sphereRadius = 1.92;

    // ─── A. Home Base Marker (Narsingdi) — Distinct Antique-Gold Beacon ────
    let posHb: THREE.Vector3 | null = null;
    if (homeBase) {
      posHb = latLonToVector3(homeBase.latitude, homeBase.longitude, sphereRadius * 1.018);
      const hbGroup = new THREE.Group();
      hbGroup.position.copy(posHb);
      hbGroup.lookAt(posHb.clone().multiplyScalar(2));
      hbGroup.renderOrder = 12;

      // Core luminous beacon
      const hbDotGeo = new THREE.SphereGeometry(0.011, 16, 16);
      const hbDotMat = new THREE.MeshBasicMaterial({
        color: 0xfff4d0,
        toneMapped: false,
        depthWrite: false,
      });
      const hbDotMesh = new THREE.Mesh(hbDotGeo, hbDotMat);
      hbGroup.add(hbDotMesh);

      // Inner gold ring (compact & sharp halo, does NOT obscure surrounding cities)
      const hbRingGeo1 = new THREE.RingGeometry(0.014, 0.020, 32);
      const hbRingMat1 = new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
      });
      const hbRingMesh1 = new THREE.Mesh(hbRingGeo1, hbRingMat1);
      hbGroup.add(hbRingMesh1);

      // Raycast hit target (enlarged for easy, responsive clicking)
      const hbHitGeo = new THREE.SphereGeometry(0.09, 12, 12);
      const hbHitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hbHitMesh = new THREE.Mesh(hbHitGeo, hbHitMat);
      hbGroup.add(hbHitMesh);

      refs.markersGroup.add(hbGroup);
      refs.markerMeshes.push({
        mesh: hbHitMesh,
        item: { type: "home-base", homeBase },
      });
    }

    // ─── B. 9 Visited Destinations Markers & 9 Narsingdi-Originated Dotted Connections ─
    const dotSharedGeo = new THREE.SphereGeometry(0.0068, 10, 10);

    destinations.forEach((dest) => {
      const posDest = homeBase
        ? getVisualDestinationPosition(dest, homeBase, sphereRadius * 1.018)
        : latLonToVector3(dest.latitude, dest.longitude, sphereRadius * 1.018);

      // 1. Marker 3D Pin & Ring (Compact, delicate, zero visual collisions)
      const markerObj = new THREE.Group();
      markerObj.position.copy(posDest);
      markerObj.lookAt(posDest.clone().multiplyScalar(2));
      markerObj.renderOrder = 12;

      // Golden pin core
      const destDotGeo = new THREE.SphereGeometry(0.0075, 16, 16);
      const destDotMat = new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        toneMapped: false,
        depthWrite: false,
      });
      const destDotMesh = new THREE.Mesh(destDotGeo, destDotMat);
      markerObj.add(destDotMesh);

      // White/Ivory outer ring
      const destRingGeo = new THREE.RingGeometry(0.010, 0.014, 24);
      const destRingMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      });
      const destRingMesh = new THREE.Mesh(destRingGeo, destRingMat);
      markerObj.add(destRingMesh);

      // Hit sphere for raycasting
      const destHitGeo = new THREE.SphereGeometry(0.08, 12, 12);
      const destHitMat = new THREE.MeshBasicMaterial({ visible: false });
      const destHitMesh = new THREE.Mesh(destHitGeo, destHitMat);
      markerObj.add(destHitMesh);

      refs.markersGroup.add(markerObj);
      refs.markerMeshes.push({
        mesh: destHitMesh,
        item: { type: "destination", destination: dest },
      });

      // 2. Construct Elevated 3D Dotted Curved Arc Connecting Narsingdi to Destination
      if (posHb) {
        const profile = ROUTE_PROFILES[dest.id] || {
          lateralBow: 0.01,
          peakAltitude: 0.08,
          dotCount: 8,
        };
        const dotCount = profile.dotCount;
        const arcPoints = createCurvedRoutePoints(
          posHb,
          posDest,
          sphereRadius,
          dotCount + 1,
          profile.lateralBow,
          profile.peakAltitude
        );

        const routeGroup = new THREE.Group();

        // A. Subtle continuous golden trajectory line
        const lineGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0xd4af37,
          transparent: true,
          opacity: 0.5,
          depthWrite: false,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        line.renderOrder = 9;
        routeGroup.add(line);

        // B. Real 3D Golden Sphere Dot Meshes along the arc (InstancedMesh per route)
        const dotsMat = new THREE.MeshBasicMaterial({
          color: 0xffd700,
          toneMapped: false,
          transparent: true,
          opacity: 0.95,
          depthWrite: false,
        });
        const dotsMesh = new THREE.InstancedMesh(dotSharedGeo, dotsMat, dotCount);
        dotsMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        dotsMesh.renderOrder = 10;

        const dummy = new THREE.Object3D();
        for (let j = 1; j <= dotCount; j++) {
          const pt = arcPoints[j];
          dummy.position.copy(pt);
          dummy.scale.set(1, 1, 1);
          dummy.updateMatrix();
          dotsMesh.setMatrixAt(j - 1, dummy.matrix);
        }
        dotsMesh.instanceMatrix.needsUpdate = true;
        routeGroup.add(dotsMesh);

        // C. Animated glowing pulse bead traveling from Narsingdi
        const pulseGeo = new THREE.SphereGeometry(0.0095, 8, 8);
        const pulseMat = new THREE.MeshBasicMaterial({
          color: 0xfffdf0,
          toneMapped: false,
          transparent: true,
          opacity: 0.9,
          depthWrite: false,
        });
        const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
        pulseMesh.renderOrder = 11;
        routeGroup.add(pulseMesh);

        refs.networkArcsGroup.add(routeGroup);
        refs.routeEntries.push({
          destinationId: dest.id,
          line,
          dotsMesh,
          dotCount,
          pulseMesh,
          arcPoints,
        });
      }
    });

    // Provide development diagnostics on window
    if (typeof window !== "undefined") {
      (window as unknown as {
        __getTravelGlobeDiagnostics?: () => {
          routeCount: number;
          totalDots: number;
          routes: { id: string; dotCount: number; start: { x: string; y: string; z: string }; end: { x: string; y: string; z: string } }[];
        };
      }).__getTravelGlobeDiagnostics = () => ({
        routeCount: refs.routeEntries.length,
        totalDots: refs.routeEntries.reduce((sum, r) => sum + r.dotCount, 0),
        routes: refs.routeEntries.map((r) => ({
          id: r.destinationId,
          dotCount: r.dotCount,
          start: { x: r.arcPoints[0].x.toFixed(3), y: r.arcPoints[0].y.toFixed(3), z: r.arcPoints[0].z.toFixed(3) },
          end: { x: r.arcPoints[r.arcPoints.length - 1].x.toFixed(3), y: r.arcPoints[r.arcPoints.length - 1].y.toFixed(3), z: r.arcPoints[r.arcPoints.length - 1].z.toFixed(3) },
        })),
      });
    }
  }, [destinations, homeBase]);

  // ───────────────────────────────────────────────────────────────────────────
  // Highlight Route Connections when Selected Destination Changes
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const refs = threeRefs.current;
    if (!refs || !refs.routeEntries) return;

    refs.routeEntries.forEach((entry) => {
      const isSelected = selectedDestination?.id === entry.destinationId;
      const lineMat = entry.line.material as THREE.LineBasicMaterial;
      const dotsMat = entry.dotsMesh.material as THREE.MeshBasicMaterial;
      const pulseMat = entry.pulseMesh.material as THREE.MeshBasicMaterial;

      if (isSelected) {
        lineMat.color.setHex(0xffffff);
        lineMat.opacity = 0.95;
        dotsMat.color.setHex(0xffffff);
        pulseMat.color.setHex(0xffffff);
        pulseMat.opacity = 1.0;
      } else {
        lineMat.color.setHex(0xd4af37);
        lineMat.opacity = selectedDestination ? 0.45 : 0.6;
        dotsMat.color.setHex(0xffd700);
        pulseMat.color.setHex(0xd4af37);
        pulseMat.opacity = selectedDestination ? 0.5 : 0.85;
      }
    });
  }, [selectedDestination]);

  // ───────────────────────────────────────────────────────────────────────────
  // Smooth Camera Focus on Selected Destination
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (selectedDestination) {
      if (threeRefs.current) {
        const refs = threeRefs.current;
        const targetPitch = ((selectedDestination.latitude * Math.PI) / 180) * 0.95;
        const targetYaw = Math.PI - ((selectedDestination.longitude - 90) * Math.PI) / 180;

        refs.targetRotation.x = THREE.MathUtils.clamp(targetPitch, -1.0, 1.0);
        refs.targetRotation.y = targetYaw;
        refs.targetZoom = 3.9;
        setZoomLevel(1.3);
      }
    } else if (isHomeBaseSelected && homeBase) {
      if (threeRefs.current) {
        const refs = threeRefs.current;
        refs.targetRotation.x = INITIAL_ROTATION_X;
        refs.targetRotation.y = INITIAL_ROTATION_Y;
        refs.targetZoom = 3.9;
        setZoomLevel(1.3);
      }
    }
  }, [selectedDestination, isHomeBaseSelected, homeBase]);

  // ───────────────────────────────────────────────────────────────────────────
  // Pointer & Touch Orbit Drag Interaction Handlers
  // ───────────────────────────────────────────────────────────────────────────
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (threeRefs.current) {
      threeRefs.current.isUserInteracting = true;
      threeRefs.current.lastMouseX = e.clientX;
      threeRefs.current.lastMouseY = e.clientY;
      threeRefs.current.dragVelocity = { x: 0, y: 0 };
    }
    setIsDragging(true);

    if (canvasRef.current) {
      canvasRef.current.setPointerCapture(e.pointerId);
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (threeRefs.current && threeRefs.current.isUserInteracting) {
      const deltaX = e.clientX - threeRefs.current.lastMouseX;
      const deltaY = e.clientY - threeRefs.current.lastMouseY;
      threeRefs.current.lastMouseX = e.clientX;
      threeRefs.current.lastMouseY = e.clientY;

      const factor = 0.0052;
      const vx = deltaY * factor;
      const vy = deltaX * factor;

      threeRefs.current.targetRotation.y += vy;
      threeRefs.current.targetRotation.x += vx;
      threeRefs.current.dragVelocity = { x: vx * 0.4, y: vy * 0.4 };
    }
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (threeRefs.current) {
        threeRefs.current.isUserInteracting = false;
      }
      setIsDragging(false);

      if (canvasRef.current) {
        try {
          canvasRef.current.releasePointerCapture(e.pointerId);
        } catch {
          // Ignore
        }
      }

      // Check direct 3D marker click via Raycaster
      if (threeRefs.current && containerRef.current && threeRefs.current.markerMeshes.length > 0) {
        const rect = containerRef.current.getBoundingClientRect();
        const clickX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const clickY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        threeRefs.current.mouseVector.set(clickX, clickY);
        threeRefs.current.raycaster.setFromCamera(
          threeRefs.current.mouseVector,
          threeRefs.current.camera
        );

        const clickables = threeRefs.current.markerMeshes.map((m) => m.mesh);
        const intersects = threeRefs.current.raycaster.intersectObjects(clickables);

        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const matched = threeRefs.current.markerMeshes.find((m) => m.mesh === hit);
          if (matched) {
            if (matched.item.type === "home-base") {
              handleSelectHomeBase();
            } else if (matched.item.type === "destination") {
              handleSelectDestination(matched.item.destination);
            }
          }
        }
      }
    },
    [handleSelectDestination, handleSelectHomeBase]
  );

  // Smooth Zoom Controls (+ / -)
  const handleZoomIn = () => {
    if (threeRefs.current) {
      threeRefs.current.targetZoom = Math.max(3.2, threeRefs.current.targetZoom - 0.55);
    }
    setZoomLevel((prev) => Math.min(2.0, +(prev + 0.2).toFixed(1)));
  };

  const handleZoomOut = () => {
    if (threeRefs.current) {
      threeRefs.current.targetZoom = Math.min(6.2, threeRefs.current.targetZoom + 0.55);
    }
    setZoomLevel((prev) => Math.max(0.6, +(prev - 0.2).toFixed(1)));
  };

  // Reset View Control — Restores Bangladesh front & center
  const handleResetView = () => {
    if (threeRefs.current) {
      const w = containerRef.current?.clientWidth || 640;
      const h = containerRef.current?.clientHeight || 640;
      threeRefs.current.targetRotation.x = INITIAL_ROTATION_X;
      threeRefs.current.targetRotation.y = INITIAL_ROTATION_Y;
      threeRefs.current.targetZoom = getResponsiveBaseZoom(w, h);
      threeRefs.current.dragVelocity = { x: 0, y: 0 };
    }
    setZoomLevel(1);
    setIsHomeBaseSelected(false);
    if (onSelectDestination) {
      onSelectDestination(null);
    }
  };

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      {/* ─── 3D Globe Canvas Container ───────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-[440px] sm:min-h-[500px] lg:min-h-0 bg-[#020202] overflow-hidden"
        aria-label="Interactive 3D Earth Globe showing personal travel network from Narsingdi Home Base"
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`w-full h-full block touch-none cursor-grab ${
            isDragging ? "cursor-grabbing" : ""
          }`}
        />

        {/* ─── Top Left: Compass Rose (Matches Reference Image) ───────────────── */}
        <div className="absolute top-5 left-5 z-20 pointer-events-none flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 bg-black/60 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <span className="text-[11px] font-serif font-bold text-[#D4AF37]">N</span>
          </div>
          <div className="w-px h-2.5 bg-[#D4AF37]/40 mt-0.5" />
        </div>

        {/* ─── Interactive 3D Cartographic Destination & Home Base Labels ───── */}
        {/* Narsingdi Home Base Badge */}
        {homeBase && (
          <button
            ref={(el) => {
              labelElementsRef.current["home-base"] = el;
            }}
            type="button"
            data-home-base-label="true"
            onClick={handleSelectHomeBase}
            style={{ display: "none" }}
            className={`absolute z-20 pointer-events-auto cursor-pointer px-3 py-1.5 rounded-xl bg-black/95 backdrop-blur-md border text-[11px] font-sans tracking-tight flex items-center gap-2 transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.85)] ${
              isHomeBaseSelected
                ? "border-[#D4AF37] text-[#FAF8F5] bg-[#D4AF37]/30 ring-2 ring-[#D4AF37]/60 scale-105"
                : "border-[#D4AF37]/75 text-[#FAF8F5] hover:border-[#D4AF37] hover:bg-[#D4AF37]/15"
            }`}
            title="Narsingdi — Central Home Base"
          >
            <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center">
              <Home className="w-3 h-3 text-[#D4AF37]" />
            </div>
            <div className="text-left leading-tight">
              <span className="font-serif font-semibold text-[#FAF8F5] block">Narsingdi</span>
              <span className="text-[9.5px] font-mono text-[#D4AF37] tracking-wider block">Home Base</span>
            </div>
          </button>
        )}

        {/* 9 Visited Destinations Labels */}
        {destinations.map((dest) => {
          const isSelected = selectedDestination?.id === dest.id;
          const shortName = dest.name.replace(" (Chattogram)", "");
          return (
            <button
              key={dest.id}
              ref={(el) => {
                labelElementsRef.current[dest.id] = el;
              }}
              type="button"
              data-destination-label={dest.id}
              onClick={() => handleSelectDestination(dest)}
              style={{ display: "none" }}
              className={`absolute z-20 pointer-events-auto cursor-pointer px-2.5 py-1 rounded-lg bg-black/90 backdrop-blur-sm border text-[11px] font-sans tracking-tight flex items-center gap-1.5 transition-all duration-200 shadow-md ${
                isSelected
                  ? "border-[#D4AF37] text-[#FFF4D0] bg-[#D4AF37]/30 shadow-[0_0_16px_rgba(212,175,55,0.4)] font-medium scale-105 ring-1 ring-[#D4AF37]"
                  : "border-white/20 text-[#E8E2D8] hover:border-[#D4AF37]/80 hover:text-[#FAF8F5] hover:bg-black"
              }`}
              title={`${dest.name} (${dest.district})`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isSelected ? "bg-[#FFF4D0] ring-2 ring-[#D4AF37]" : "bg-[#D4AF37]"
                }`}
              />
              <span className="font-serif font-medium">{shortName}</span>
            </button>
          );
        })}

        {/* ─── Bottom Left: Minimal Controls (Zoom In, Zoom Out, Reset) ───────── */}
        <div className="absolute bottom-5 left-5 z-20 flex flex-col gap-1.5 pointer-events-auto">
          <div className="flex flex-col bg-black/85 backdrop-blur-md rounded-xl border border-white/15 overflow-hidden shadow-2xl">
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-2.5 text-[#D4CDBC] hover:text-[#FAF8F5] hover:bg-white/[0.08] transition-colors cursor-pointer border-b border-white/[0.08]"
              title={`Zoom In (${zoomLevel}x)`}
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-2.5 text-[#D4CDBC] hover:text-[#FAF8F5] hover:bg-white/[0.08] transition-colors cursor-pointer border-b border-white/[0.08]"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetView}
              className="p-2.5 text-[#D4AF37] hover:text-[#FFF4D0] hover:bg-white/[0.08] transition-colors cursor-pointer"
              title="Reset View to Bangladesh"
              aria-label="Reset globe to neutral position"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ─── Bottom Right: Scientific Live Coordinates Readout ────────────── */}
        <div className="absolute bottom-5 right-5 z-20 pointer-events-none">
          <div className="px-3.5 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-right font-mono text-[11px] sm:text-xs tracking-wider text-[#FAF8F5]/90">
            <div className="text-[#D4AF37] font-semibold">{coordinates.lat}</div>
            <div className="text-[#9C988F] text-[10px]">{coordinates.lon}</div>
          </div>
        </div>

        {/* ─── Bottom Center: Subtle Drag Interaction Helper ────────────────── */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:block">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/[0.06] text-[10.5px] font-mono text-[#9C988F]">
            <Compass className="w-3 h-3 text-[#D4AF37]" />
            <span>Drag to rotate · Click markers to explore</span>
          </div>
        </div>
      </div>
    </div>
  );
}
