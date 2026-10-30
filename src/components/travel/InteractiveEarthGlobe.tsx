"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Compass, RotateCcw, ZoomIn, ZoomOut, ArrowRight, Home, X } from "lucide-react";
import { Destination, HomeBase, HOME_BASE } from "@/data/travelData";

interface InteractiveEarthGlobeProps {
  destinations?: Destination[];
  homeBase?: HomeBase;
  selectedDestination?: Destination | null;
  onSelectDestination?: (destination: Destination | null) => void;
  onOpenJournal?: (destination: Destination) => void;
  className?: string;
}

// Convert Lat/Lon (degrees) to 3D Cartesian coordinates on sphere
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Orthographic 2D projection helper for fallback mode
function projectSpherical(
  latDeg: number,
  lonDeg: number,
  rotX: number,
  rotY: number,
  radius: number
): { x: number; y: number; visible: boolean; depth: number } {
  const phi = (latDeg * Math.PI) / 180;
  const lam = (lonDeg * Math.PI) / 180 + rotY;

  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const cosLam = Math.cos(lam);
  const sinLam = Math.sin(lam);

  const x0 = radius * cosPhi * sinLam;
  const y0 = radius * sinPhi;
  const z0 = radius * cosPhi * cosLam;

  const cosTilt = Math.cos(rotX);
  const sinTilt = Math.sin(rotX);

  const x = x0;
  const y = y0 * cosTilt - z0 * sinTilt;
  const z = y0 * sinTilt + z0 * cosTilt;

  const visible = z > 0;
  const depth = Math.max(0, z / radius);

  return { x, y, visible, depth };
}

export function InteractiveEarthGlobe({
  destinations = [],
  homeBase = HOME_BASE,
  selectedDestination = null,
  onSelectDestination,
  onOpenJournal,
  className = "",
}: InteractiveEarthGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Status & live readout states
  const [coordinates, setCoordinates] = useState<{ lat: string; lon: string }>({
    lat: "24.36° N",
    lon: "88.63° E",
  });
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [isHomeBaseSelected, setIsHomeBaseSelected] = useState<boolean>(false);

  // Three.js internal references
  const threeRefs = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    globeGroup: THREE.Group;
    earthMesh: THREE.Mesh;
    cloudsMesh: THREE.Mesh;
    markersGroup: THREE.Group;
    targetRotation: { x: number; y: number };
    currentRotation: { x: number; y: number };
    targetZoom: number;
    currentZoom: number;
    isUserInteracting: boolean;
    lastMouseX: number;
    lastMouseY: number;
    animFrameId: number;
    isVisible: boolean;
    raycaster: THREE.Raycaster;
    mouseVector: THREE.Vector2;
    markerMeshes: {
      mesh: THREE.Object3D;
      item: { type: "destination"; destination: Destination } | { type: "home-base"; homeBase: HomeBase };
    }[];
  } | null>(null);

  // Fallback Canvas 2D references
  const fallbackRefs = useRef<{
    isFallback: boolean;
    rotation: { x: number; y: number };
    targetRotation: { x: number; y: number };
    zoom: number;
    targetZoom: number;
    animId: number;
    isInteracting: boolean;
    lastX: number;
    lastY: number;
  }>({
    isFallback: false,
    rotation: { x: 0.28, y: -1.55 },
    targetRotation: { x: 0.28, y: -1.55 },
    zoom: 1,
    targetZoom: 1,
    animId: 0,
    isInteracting: false,
    lastX: 0,
    lastY: 0,
  });

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const destinationsRef = useRef(destinations);
  useEffect(() => {
    destinationsRef.current = destinations;
  }, [destinations]);

  const homeBaseRef = useRef(homeBase);
  useEffect(() => {
    homeBaseRef.current = homeBase;
  }, [homeBase]);

  // If a destination is selected from outside, unselect home base
  useEffect(() => {
    if (selectedDestination) {
      setIsHomeBaseSelected(false);
    }
  }, [selectedDestination]);

  // Initialize Renderer (WebGL with automatic Canvas 2D fallback)
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 560;

    let useWebGL = true;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      // Test WebGL context availability
      const testGl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!testGl) {
        useWebGL = false;
      } else {
        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      }
    } catch {
      useWebGL = false;
    }

    if (!useWebGL || !renderer) {
      // ─── High-Fidelity Canvas 2D Fallback ──────────────────────────────────
      fallbackRefs.current.isFallback = true;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      let lastTime = performance.now();
      const fb = fallbackRefs.current;

      const renderFallback = (time: number) => {
        const delta = (time - lastTime) / 1000;
        lastTime = time;

        if (!fb.isInteracting && !isReducedMotion) {
          fb.targetRotation.y += delta * 0.08;
        }

        fb.rotation.x += (fb.targetRotation.x - fb.rotation.x) * 0.085;
        fb.rotation.y += (fb.targetRotation.y - fb.rotation.y) * 0.085;
        fb.targetRotation.x = Math.max(-1.1, Math.min(1.1, fb.targetRotation.x));

        fb.zoom += (fb.targetZoom - fb.zoom) * 0.1;

        // Render Canvas 2D Globe
        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        const baseRadius = Math.min(width, height) * 0.36 * fb.zoom;

        // 1. Atmospheric Outer Glow
        const atmosGrad = ctx.createRadialGradient(cx, cy, baseRadius * 0.9, cx, cy, baseRadius * 1.25);
        atmosGrad.addColorStop(0, "rgba(212, 175, 55, 0.12)");
        atmosGrad.addColorStop(0.5, "rgba(56, 120, 220, 0.08)");
        atmosGrad.addColorStop(1, "transparent");
        ctx.fillStyle = atmosGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius * 1.25, 0, Math.PI * 2);
        ctx.fill();

        // 2. Earth Sphere Body
        const sphereGrad = ctx.createRadialGradient(
          cx - baseRadius * 0.35,
          cy - baseRadius * 0.35,
          baseRadius * 0.1,
          cx,
          cy,
          baseRadius
        );
        sphereGrad.addColorStop(0, "#15202B");
        sphereGrad.addColorStop(0.7, "#090D12");
        sphereGrad.addColorStop(1, "#030406");

        ctx.fillStyle = sphereGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // 3. Coordinate Grid Rings
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 0.75;
        for (let lat = -60; lat <= 60; lat += 30) {
          ctx.beginPath();
          let started = false;
          for (let lon = -180; lon <= 180; lon += 6) {
            const pt = projectSpherical(lat, lon, fb.rotation.x, fb.rotation.y, baseRadius);
            if (pt.visible) {
              const px = cx + pt.x;
              const py = cy + pt.y;
              if (!started) {
                ctx.moveTo(px, py);
                started = true;
              } else {
                ctx.lineTo(px, py);
              }
            } else {
              started = false;
            }
          }
          ctx.stroke();
        }

        for (let lon = -180; lon < 180; lon += 30) {
          ctx.beginPath();
          let started = false;
          for (let lat = -90; lat <= 90; lat += 5) {
            const pt = projectSpherical(lat, lon, fb.rotation.x, fb.rotation.y, baseRadius);
            if (pt.visible) {
              const px = cx + pt.x;
              const py = cy + pt.y;
              if (!started) {
                ctx.moveTo(px, py);
                started = true;
              } else {
                ctx.lineTo(px, py);
              }
            } else {
              started = false;
            }
          }
          ctx.stroke();
        }

        // 4. Draw Home Base Marker (Narsingdi) in Cyan Beacon
        const hb = homeBaseRef.current;
        if (hb) {
          const hbPt = projectSpherical(hb.latitude, hb.longitude, fb.rotation.x, fb.rotation.y, baseRadius);
          if (hbPt.visible) {
            const px = cx + hbPt.x;
            const py = cy + hbPt.y;

            // Cyan outer pulsing ring
            ctx.strokeStyle = "rgba(56, 189, 248, 0.95)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(px, py, 7.5, 0, Math.PI * 2);
            ctx.stroke();

            // Cyan inner beacon
            ctx.fillStyle = "#38BDF8";
            ctx.beginPath();
            ctx.arc(px, py, 3.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // 5. Visited Destination Markers in 2D (Gold)
        destinationsRef.current.forEach((dest) => {
          const pt = projectSpherical(dest.latitude, dest.longitude, fb.rotation.x, fb.rotation.y, baseRadius);
          if (pt.visible) {
            const px = cx + pt.x;
            const py = cy + pt.y;

            // Outer white ring
            ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(px, py, 6, 0, Math.PI * 2);
            ctx.stroke();

            // Center gold dot
            ctx.fillStyle = "#D4AF37";
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        // 6. Update live coordinate readout
        const facingLat = ((-fb.rotation.x * 180) / Math.PI).toFixed(2);
        let facingLonVal = ((-fb.rotation.y * 180) / Math.PI) % 360;
        if (facingLonVal > 180) facingLonVal -= 360;
        if (facingLonVal < -180) facingLonVal += 360;
        const latDir = parseFloat(facingLat) >= 0 ? "N" : "S";
        const lonDir = facingLonVal >= 0 ? "E" : "W";
        setCoordinates({
          lat: `${Math.abs(parseFloat(facingLat)).toFixed(2)}° ${latDir}`,
          lon: `${Math.abs(facingLonVal).toFixed(2)}° ${lonDir}`,
        });

        ctx.restore();
        fb.animId = requestAnimationFrame(renderFallback);
      };

      fb.animId = requestAnimationFrame(renderFallback);

      return () => {
        cancelAnimationFrame(fb.animId);
      };
    }

    // ─── 3D Three.js WebGL Pipeline ──────────────────────────────────────────
    fallbackRefs.current.isFallback = false;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.2);

    // 2. Globe Root Group
    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0.28;
    globeGroup.rotation.y = -1.55;
    scene.add(globeGroup);

    // 3. Earth Sphere & Textures
    const sphereRadius = 1.9;
    const textureLoader = new THREE.TextureLoader();

    const earthTexture = textureLoader.load("/images/globe/earth-map.jpg");
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const cloudsTexture = textureLoader.load("/images/globe/earth-clouds.png");

    const earthGeo = new THREE.SphereGeometry(sphereRadius, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.65,
      metalness: 0.08,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // 4. Cloud Layer
    const cloudsGeo = new THREE.SphereGeometry(sphereRadius * 1.012, 48, 48);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    globeGroup.add(cloudsMesh);

    // 5. Atmospheric Rim Glow
    const atmosphereGeo = new THREE.SphereGeometry(sphereRadius * 1.12, 48, 48);
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
          float intensity = pow(0.68 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          vec3 atmosphereColor = mix(vec3(0.12, 0.35, 0.85), vec3(0.83, 0.68, 0.22), 0.25);
          gl_FragColor = vec4(atmosphereColor, intensity * 0.72);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    globeGroup.add(atmosphereMesh);

    // 6. Subtle Celestial Star Field
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 380;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 45;
      starPositions[i + 1] = (Math.random() - 0.5) * 45;
      starPositions[i + 2] = -12 - Math.random() * 25;
    }
    starsGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({
      size: 1.2,
      color: 0xd4af37,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    // 7. Lighting
    const ambientLight = new THREE.AmbientLight(0x223344, 0.75);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 2.4);
    sunLight.position.set(5, 3.5, 4.5);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x386699, 1.1);
    rimLight.position.set(-6, -2, -3);
    scene.add(rimLight);

    // 8. Markers Group
    const markersGroup = new THREE.Group();
    globeGroup.add(markersGroup);

    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();
    const markerMeshes: {
      mesh: THREE.Object3D;
      item: { type: "destination"; destination: Destination } | { type: "home-base"; homeBase: HomeBase };
    }[] = [];

    threeRefs.current = {
      scene,
      camera,
      renderer,
      globeGroup,
      earthMesh,
      cloudsMesh,
      markersGroup,
      targetRotation: { x: globeGroup.rotation.x, y: globeGroup.rotation.y },
      currentRotation: { x: globeGroup.rotation.x, y: globeGroup.rotation.y },
      targetZoom: 5.2,
      currentZoom: 5.2,
      isUserInteracting: false,
      lastMouseX: 0,
      lastMouseY: 0,
      animFrameId: 0,
      isVisible: true,
      raycaster,
      mouseVector,
      markerMeshes,
    };

    // 9. Render Loop
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const refs = threeRefs.current;
      if (!refs) return;

      if (refs.isVisible) {
        if (!refs.isUserInteracting && !isReducedMotion) {
          refs.targetRotation.y += delta * 0.08;
          cloudsMesh.rotation.y += delta * 0.11;
        }

        refs.currentRotation.x += (refs.targetRotation.x - refs.currentRotation.x) * 0.085;
        refs.currentRotation.y += (refs.targetRotation.y - refs.currentRotation.y) * 0.085;

        refs.targetRotation.x = Math.max(-1.1, Math.min(1.1, refs.targetRotation.x));

        globeGroup.rotation.x = refs.currentRotation.x;
        globeGroup.rotation.y = refs.currentRotation.y;

        refs.currentZoom += (refs.targetZoom - refs.currentZoom) * 0.1;
        camera.position.z = refs.currentZoom;

        const facingLat = ((-refs.currentRotation.x * 180) / Math.PI).toFixed(2);
        let facingLonVal = ((-refs.currentRotation.y * 180) / Math.PI) % 360;
        if (facingLonVal > 180) facingLonVal -= 360;
        if (facingLonVal < -180) facingLonVal += 360;

        const latDir = parseFloat(facingLat) >= 0 ? "N" : "S";
        const lonDir = facingLonVal >= 0 ? "E" : "W";
        setCoordinates({
          lat: `${Math.abs(parseFloat(facingLat)).toFixed(2)}° ${latDir}`,
          lon: `${Math.abs(facingLonVal).toFixed(2)}° ${lonDir}`,
        });

        renderer.render(scene, camera);
      }

      refs.animFrameId = requestAnimationFrame(animate);
    };

    threeRefs.current.animFrameId = requestAnimationFrame(animate);

    // 10. Resize & Visibility
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

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
        starsGeo.dispose();
        starsMat.dispose();
      }
    };
  }, [isReducedMotion]);

  // Update Markers on Globe (9 destinations + 1 distinct Home Base beacon)
  useEffect(() => {
    const refs = threeRefs.current;
    if (!refs) return;

    while (refs.markersGroup.children.length > 0) {
      const child = refs.markersGroup.children[0];
      refs.markersGroup.remove(child);
      if ("geometry" in child) (child as THREE.Mesh).geometry.dispose();
    }
    refs.markerMeshes = [];

    const sphereRadius = 1.9;

    // A. Add Home Base Marker (Narsingdi) - Distinct Cyan-Blue Beacon
    if (homeBase) {
      const posHb = latLonToVector3(homeBase.latitude, homeBase.longitude, sphereRadius * 1.005);
      const hbGroup = new THREE.Group();
      hbGroup.position.copy(posHb);
      hbGroup.lookAt(posHb.clone().multiplyScalar(2));

      // Cyan core dot
      const hbDotGeo = new THREE.SphereGeometry(0.05, 16, 16);
      const hbDotMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const hbDotMesh = new THREE.Mesh(hbDotGeo, hbDotMat);
      hbGroup.add(hbDotMesh);

      // Cyan outer beacon ring
      const hbRingGeo = new THREE.RingGeometry(0.075, 0.105, 32);
      const hbRingMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
      });
      const hbRingMesh = new THREE.Mesh(hbRingGeo, hbRingMat);
      hbGroup.add(hbRingMesh);

      // Hit mesh for raycasting
      const hbHitGeo = new THREE.SphereGeometry(0.18, 12, 12);
      const hbHitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hbHitMesh = new THREE.Mesh(hbHitGeo, hbHitMat);
      hbGroup.add(hbHitMesh);

      refs.markersGroup.add(hbGroup);
      refs.markerMeshes.push({
        mesh: hbHitMesh,
        item: { type: "home-base", homeBase },
      });
    }

    // B. Add the 9 Visited Destinations Markers (Antique Gold & White Rings)
    destinations.forEach((dest) => {
      const pos = latLonToVector3(dest.latitude, dest.longitude, sphereRadius * 1.004);

      const markerObj = new THREE.Group();
      markerObj.position.copy(pos);
      markerObj.lookAt(pos.clone().multiplyScalar(2));

      const dotGeo = new THREE.SphereGeometry(0.045, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xd4af37 });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      markerObj.add(dotMesh);

      const ringGeo = new THREE.RingGeometry(0.065, 0.085, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      markerObj.add(ringMesh);

      const hitGeo = new THREE.SphereGeometry(0.16, 12, 12);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      markerObj.add(hitMesh);

      refs.markersGroup.add(markerObj);
      refs.markerMeshes.push({
        mesh: hitMesh,
        item: { type: "destination", destination: dest },
      });
    });
  }, [destinations, homeBase]);

  // Smoothly rotate globe to face selected destination or home base
  useEffect(() => {
    if (selectedDestination) {
      if (threeRefs.current) {
        const refs = threeRefs.current;
        const targetPitch = (selectedDestination.latitude * Math.PI) / 180;
        const targetYaw = -(selectedDestination.longitude * Math.PI) / 180 - Math.PI / 2;

        refs.targetRotation.x = THREE.MathUtils.clamp(targetPitch, -1.0, 1.0);
        refs.targetRotation.y = targetYaw;
        refs.targetZoom = 4.2;
        setZoomLevel(1.4);
      } else if (fallbackRefs.current.isFallback) {
        const fb = fallbackRefs.current;
        fb.targetRotation.x = (selectedDestination.latitude * Math.PI) / 180;
        fb.targetRotation.y = -(selectedDestination.longitude * Math.PI) / 180;
        fb.targetZoom = 1.35;
        setZoomLevel(1.4);
      }
    } else if (isHomeBaseSelected && homeBase) {
      if (threeRefs.current) {
        const refs = threeRefs.current;
        const targetPitch = (homeBase.latitude * Math.PI) / 180;
        const targetYaw = -(homeBase.longitude * Math.PI) / 180 - Math.PI / 2;

        refs.targetRotation.x = THREE.MathUtils.clamp(targetPitch, -1.0, 1.0);
        refs.targetRotation.y = targetYaw;
        refs.targetZoom = 4.2;
        setZoomLevel(1.4);
      } else if (fallbackRefs.current.isFallback) {
        const fb = fallbackRefs.current;
        fb.targetRotation.x = (homeBase.latitude * Math.PI) / 180;
        fb.targetRotation.y = -(homeBase.longitude * Math.PI) / 180;
        fb.targetZoom = 1.35;
        setZoomLevel(1.4);
      }
    }
  }, [selectedDestination, isHomeBaseSelected, homeBase]);

  // ─── Interaction Handlers (Pointer & Touch) ────────────────────────────────

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (threeRefs.current) {
      threeRefs.current.isUserInteracting = true;
      threeRefs.current.lastMouseX = e.clientX;
      threeRefs.current.lastMouseY = e.clientY;
    } else {
      fallbackRefs.current.isInteracting = true;
      fallbackRefs.current.lastX = e.clientX;
      fallbackRefs.current.lastY = e.clientY;
    }
    setIsDragging(true);

    if (canvasRef.current) {
      canvasRef.current.setPointerCapture(e.pointerId);
    }
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (threeRefs.current && threeRefs.current.isUserInteracting) {
        const deltaX = e.clientX - threeRefs.current.lastMouseX;
        const deltaY = e.clientY - threeRefs.current.lastMouseY;
        threeRefs.current.lastMouseX = e.clientX;
        threeRefs.current.lastMouseY = e.clientY;

        const factor = 0.0055;
        threeRefs.current.targetRotation.y += deltaX * factor;
        threeRefs.current.targetRotation.x += deltaY * factor;
      } else if (fallbackRefs.current.isInteracting) {
        const deltaX = e.clientX - fallbackRefs.current.lastX;
        const deltaY = e.clientY - fallbackRefs.current.lastY;
        fallbackRefs.current.lastX = e.clientX;
        fallbackRefs.current.lastY = e.clientY;

        const factor = 0.0055;
        fallbackRefs.current.targetRotation.y += deltaX * factor;
        fallbackRefs.current.targetRotation.x += deltaY * factor;
      }
    },
    []
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (threeRefs.current) {
        threeRefs.current.isUserInteracting = false;
      }
      fallbackRefs.current.isInteracting = false;
      setIsDragging(false);

      if (canvasRef.current) {
        try {
          canvasRef.current.releasePointerCapture(e.pointerId);
        } catch {
          // Ignore
        }
      }

      // Check marker click in WebGL
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
              setIsHomeBaseSelected(true);
              if (onSelectDestination) {
                onSelectDestination(null);
              }
            } else if (matched.item.type === "destination") {
              setIsHomeBaseSelected(false);
              if (onSelectDestination) {
                onSelectDestination(matched.item.destination);
              }
            }
          }
        }
      }
    },
    [onSelectDestination]
  );

  // Smooth Zoom Controls (+ / -)
  const handleZoomIn = () => {
    if (threeRefs.current) {
      threeRefs.current.targetZoom = Math.max(3.0, threeRefs.current.targetZoom - 0.7);
    } else {
      fallbackRefs.current.targetZoom = Math.min(1.8, fallbackRefs.current.targetZoom + 0.25);
    }
    setZoomLevel((prev) => Math.min(2.2, +(prev + 0.3).toFixed(1)));
  };

  const handleZoomOut = () => {
    if (threeRefs.current) {
      threeRefs.current.targetZoom = Math.min(7.5, threeRefs.current.targetZoom + 0.7);
    } else {
      fallbackRefs.current.targetZoom = Math.max(0.65, fallbackRefs.current.targetZoom - 0.25);
    }
    setZoomLevel((prev) => Math.max(0.6, +(prev - 0.3).toFixed(1)));
  };

  // Reset View Control
  const handleResetView = () => {
    if (threeRefs.current) {
      threeRefs.current.targetRotation.x = 0.28;
      threeRefs.current.targetRotation.y = -1.55;
      threeRefs.current.targetZoom = 5.2;
    } else {
      fallbackRefs.current.targetRotation.x = 0.28;
      fallbackRefs.current.targetRotation.y = -1.55;
      fallbackRefs.current.targetZoom = 1;
    }
    setZoomLevel(1);
    setIsHomeBaseSelected(false);
    if (onSelectDestination) {
      onSelectDestination(null);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[2/1] max-h-[640px] rounded-2xl bg-[#030303] border border-white/[0.08] overflow-hidden select-none ${className}`}
      aria-label="Interactive 3D Earth Globe showing visited travel destinations and home base"
    >
      {/* Canvas for WebGL or Canvas 2D */}
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

      {/* Atmospheric Top Bar: Status Badge & Marker Legend */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex flex-wrap items-center gap-2 pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono text-[#FAF8F5]">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[#D4AF37] font-semibold">3D Terrestrial Globe</span>
          <span className="text-white/30 hidden xs:inline">·</span>
          <span className="text-[#9C988F] text-[11px] hidden xs:inline">
            {destinations.length > 0
              ? `${destinations.length} Destinations`
              : "0 Coordinates Logged"}
          </span>
          <span className="text-white/30 hidden sm:inline">·</span>
          <span className="text-[#38BDF8] text-[11px] hidden sm:inline flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            Home: Narsingdi
          </span>
        </div>

        {(selectedDestination || isHomeBaseSelected) && (
          <button
            onClick={() => {
              setIsHomeBaseSelected(false);
              if (onSelectDestination) onSelectDestination(null);
            }}
            className="px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[11px] font-mono text-[#FAF8F5] transition-colors border border-white/10 cursor-pointer"
          >
            Clear Selected
          </button>
        )}
      </div>

      {/* Floating Interactive Controls (Zoom In, Zoom Out, Reset) */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 flex flex-col gap-2 pointer-events-auto">
        <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-xl">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-2 sm:p-2.5 text-[#D4CDBC] hover:text-[#FAF8F5] hover:bg-white/[0.08] transition-colors cursor-pointer border-b border-white/[0.08]"
            title={`Zoom In (${zoomLevel}x)`}
            aria-label="Zoom in on 3D Globe"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleZoomOut}
            className="p-2 sm:p-2.5 text-[#D4CDBC] hover:text-[#FAF8F5] hover:bg-white/[0.08] transition-colors cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom out on 3D Globe"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleResetView}
          className="p-2 sm:p-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[#D4AF37] hover:bg-white/[0.08] transition-colors cursor-pointer flex items-center justify-center shadow-xl"
          title="Reset View"
          aria-label="Reset 3D Globe view to neutral coordinates"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Left: Drag & Rotate Helper Hint */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/[0.06] text-[10.5px] sm:text-xs font-mono text-[#9C988F]">
          <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Drag to orbit · Pinch or scroll to zoom</span>
        </div>
      </div>

      {/* Bottom Right: Live Precision Scientific Coordinate Readout */}
      <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-20 pointer-events-none">
        <div className="px-3.5 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/[0.08] text-right font-mono text-[11px] sm:text-xs tracking-wider text-[#FAF8F5]/90">
          <div className="text-[#D4AF37] font-semibold">{coordinates.lat}</div>
          <div className="text-[#9C988F] text-[10.5px]">{coordinates.lon}</div>
        </div>
      </div>

      {/* A. Distinct Home Base Flyout Preview Card (No Journal Action) */}
      {isHomeBaseSelected && homeBase && (
        <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-8 z-30 max-w-xs sm:max-w-sm rounded-xl bg-black/92 backdrop-blur-xl border border-[#38BDF8]/40 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.85)] animate-hero-fade">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-widest flex items-center gap-1.5 font-semibold">
                <Home className="w-3 h-3 text-[#38BDF8]" />
                Home Base · Origin Point
              </span>
              <h4 className="font-serif text-lg text-[#FAF8F5] font-semibold leading-tight mt-1">
                {homeBase.name}, {homeBase.country}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setIsHomeBaseSelected(false)}
              className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Home Base Preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs font-sans text-[#D4CDBC] leading-relaxed mb-3">
            {homeBase.description}
          </p>

          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#9C988F]">
            <span>{homeBase.latitude.toFixed(4)}° N, {homeBase.longitude.toFixed(4)}° E</span>
            <span className="text-[#38BDF8] font-medium">Roots &amp; Origin</span>
          </div>
        </div>
      )}

      {/* B. Selected Destination Flyout Preview Card */}
      {selectedDestination && !isHomeBaseSelected && (
        <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-8 z-30 max-w-xs sm:max-w-sm rounded-xl bg-black/92 backdrop-blur-xl border border-[#D4AF37]/40 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.85)] animate-hero-fade">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block">
                {selectedDestination.region}, {selectedDestination.country}
              </span>
              <h4 className="font-serif text-lg text-[#FAF8F5] font-semibold leading-tight mt-0.5">
                {selectedDestination.name}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => onSelectDestination && onSelectDestination(null)}
              className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Destination Preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs font-sans text-[#D4CDBC] line-clamp-2 leading-relaxed mb-3">
            {selectedDestination.shortDescription}
          </p>

          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
            <span className="text-[10.5px] font-mono text-[#9C988F]">
              {selectedDestination.latitude.toFixed(2)}° N, {selectedDestination.longitude.toFixed(2)}° E
            </span>
            <button
              type="button"
              onClick={() => onOpenJournal && onOpenJournal(selectedDestination)}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4AF37] hover:text-[#FFF4D0] font-medium transition-colors cursor-pointer"
            >
              <span>Explore Journey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
