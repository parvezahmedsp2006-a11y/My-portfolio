/**
 * Travel Data Architecture — Beyond the Horizon
 *
 * Strongly typed, authentic data source for Parvez Ahmed's personal travel experiences.
 * Contains the 9 confirmed visited destinations in Bangladesh and 1 separate Home Base (Narsingdi).
 *
 * Strict Data Integrity Rules:
 * 1. Narsingdi is the Home Base, NOT a visited travel destination.
 * 2. Each of the 9 destinations represents an independent travel experience at a different time.
 * 3. Never combine destinations into a single trip or itinerary.
 * 4. Do not invent visit dates, personal stories, stock photos, or experiences.
 * 5. Chittagong and Patenga Sea Beach are separate selectable destinations.
 */

export type TravelCategory =
  | "All"
  | "Mountains"
  | "Rivers"
  | "Forests"
  | "Beaches"
  | "Nature"
  | "Adventure"
  | "Geological Exploration";

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: TravelCategory;
  date?: string | null;
  location?: string | null;
  width?: number;
  height?: number;
}

export interface TravelPhoto {
  id: string;
  destinationId: string;
  image: string;
  alt: string;
  caption: string;
  featured: boolean;
  visitDate?: string | null;
}

/**
 * Featured Travel Photographs
 * Configured authentic personal travel photography collection.
 * Registered personal photographs from public/images/travel/.
 */
export const FEATURED_TRAVEL_PHOTOS: TravelPhoto[] = [
  {
    id: "cb-photo-1",
    destinationId: "dest-coxs-bazar",
    image: "/images/travel/coxs-bazar/coxs-bazar-sunset-horizon.jpg",
    alt: "Parvez Ahmed looking toward the sunset over the Cox's Bazar coastline and sea horizon",
    caption: "Golden sunset over the Bay of Bengal horizon at Cox's Bazar",
    featured: true,
    visitDate: null,
  },
  {
    id: "cb-photo-2",
    destinationId: "dest-coxs-bazar",
    image: "/images/travel/coxs-bazar/coxs-bazar-sea-beach-waves.jpg",
    alt: "Parvez Ahmed with arms outstretched at the shoreline of Cox's Bazar sea beach with breaking ocean waves",
    caption: "Ocean waves rolling onto the natural sand shore at Cox's Bazar sea beach",
    featured: true,
    visitDate: null,
  },
  {
    id: "cb-photo-3",
    destinationId: "dest-coxs-bazar",
    image: "/images/travel/coxs-bazar/coxs-bazar-coastal-overlook.jpg",
    alt: "Parvez Ahmed standing at an elevated coastal overlook overlooking the sea at Cox's Bazar",
    caption: "Panoramic overlook of the coastline and hills in Cox's Bazar",
    featured: true,
    visitDate: null,
  },
  {
    id: "cb-photo-4",
    destinationId: "dest-coxs-bazar",
    image: "/images/travel/coxs-bazar/coxs-bazar-coastal-pier.jpg",
    alt: "Parvez Ahmed observing the waves and open sea from a coastal pier in Cox's Bazar",
    caption: "Observing coastal waves and tides along the Bay of Bengal",
    featured: true,
    visitDate: null,
  },
  {
    id: "cb-photo-5",
    destinationId: "dest-coxs-bazar",
    image: "/images/travel/coxs-bazar/coxs-bazar-cruise-deck.jpg",
    alt: "Parvez Ahmed seated on a coastal vessel deck during a sea journey in Cox's Bazar",
    caption: "Maritime coastal journey along the Cox's Bazar shoreline",
    featured: true,
    visitDate: null,
  },
];

export interface TravelStory {
  introduction: string;
  narrative: string[];
  observations?: string[];
  memorableMoments?: string[];
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  district: string;
  region: string;
  latitude: number;
  longitude: number;
  visitDate: string | null;
  tagline: string;
  shortDescription: string;
  geologicalNote?: string; // Optional geological observation notes (marked TODO until user verification)
  coverImage: string | null;
  story: TravelStory | null;
  galleryImages: GalleryImage[];
  categories: TravelCategory[];
  journalPublished: boolean;
}

export interface HomeBase {
  id: string;
  name: string;
  country: string;
  district: string;
  region: string;
  latitude: number;
  longitude: number;
  type: "home-base";
  description: string;
}

export interface TravelStatistics {
  placesExplored: number;
  homeBaseName: string;
  travelStories: number;
  photographs: number;
  regionsExplored: number;
  regionNames: string[];
}

/**
 * Verified Home Base — Narsingdi, Bangladesh
 * Represented separately from visited travel destinations.
 */
export const HOME_BASE: HomeBase = {
  id: "home-base-narsingdi",
  name: "Narsingdi",
  country: "Bangladesh",
  district: "Narsingdi",
  region: "Dhaka Division",
  latitude: 23.923,
  longitude: 90.7177,
  type: "home-base",
  description:
    "Personal home district and roots. The origin and return point for all exploratory journeys across Bangladesh.",
};

/**
 * 9 Confirmed Visited Destinations
 * Geographically verified coordinates from established geodetic datasets.
 * Chittagong and Patenga Sea Beach are maintained as separate destinations.
 */
export const TRAVEL_DESTINATIONS: Destination[] = [
  {
    id: "dest-coxs-bazar",
    slug: "coxs-bazar",
    name: "Cox's Bazar",
    country: "Bangladesh",
    district: "Cox's Bazar",
    region: "Chattogram Division",
    latitude: 21.4272,
    longitude: 92.0058,
    visitDate: null,
    tagline: "The Longest Sea Beach",
    shortDescription:
      "The world's longest unbroken natural sandy sea beach, characterized by dynamic marine littoral processes and coastal cliffs along the Bay of Bengal.",
    // TODO: Verify personal coastal landform observations (marine littoral sands and coastal cliff morphology)
    geologicalNote: "TODO: Coastal landforms, marine littoral sand dynamics, and Tertiary cliff sections along the Bay of Bengal shoreline.",
    coverImage: "/images/travel/coxs-bazar/coxs-bazar-sunset-horizon.jpg",
    story: null,
    galleryImages: [
      {
        id: "cb-gallery-1",
        url: "/images/travel/coxs-bazar/coxs-bazar-sunset-horizon.jpg",
        caption: "Golden sunset over the Bay of Bengal horizon at Cox's Bazar",
        category: "Beaches",
      },
      {
        id: "cb-gallery-2",
        url: "/images/travel/coxs-bazar/coxs-bazar-sea-beach-waves.jpg",
        caption: "Ocean waves rolling onto the natural sand shore at Cox's Bazar sea beach",
        category: "Beaches",
      },
      {
        id: "cb-gallery-3",
        url: "/images/travel/coxs-bazar/coxs-bazar-coastal-overlook.jpg",
        caption: "Panoramic overlook of the coastline and hills in Cox's Bazar",
        category: "Nature",
      },
      {
        id: "cb-gallery-4",
        url: "/images/travel/coxs-bazar/coxs-bazar-coastal-pier.jpg",
        caption: "Observing coastal waves and tides along the Bay of Bengal",
        category: "Beaches",
      },
      {
        id: "cb-gallery-5",
        url: "/images/travel/coxs-bazar/coxs-bazar-cruise-deck.jpg",
        caption: "Maritime coastal journey along the Cox's Bazar shoreline",
        category: "Adventure",
      },
    ],
    categories: ["Beaches", "Nature"],
    journalPublished: false,
  },
  {
    id: "dest-sreemangal",
    slug: "sreemangal",
    name: "Sreemangal",
    country: "Bangladesh",
    district: "Moulvibazar",
    region: "Sylhet Division",
    latitude: 24.3065,
    longitude: 91.7296,
    visitDate: null,
    tagline: "Tea Garden Paradise",
    shortDescription:
      "The tea capital of Bangladesh, defined by rolling terraced tea estates, Lawachara rainforest ecosystems, and humid sub-tropical microclimates.",
    // TODO: Verify geological observations on Dupi Tila formation sandstone and tea garden terracing
    geologicalNote: "TODO: Dupi Tila sandstone formation, rolling anticlinal hillocks, and acidic permeable tea soils.",
    coverImage: null,
    story: null,
    galleryImages: [],
    categories: ["Forests", "Nature"],
    journalPublished: false,
  },
  {
    id: "dest-sylhet",
    slug: "sylhet",
    name: "Sylhet",
    country: "Bangladesh",
    district: "Sylhet",
    region: "Sylhet Division",
    latitude: 24.8949,
    longitude: 91.8687,
    visitDate: null,
    tagline: "Land of Natural Beauty",
    shortDescription:
      "Surma River basin plain bounded by the Meghalaya plateau foothills, featuring wetland haors, gravel riverbeds, and heavy monsoon runoff channels.",
    // TODO: Verify observations on Surma basin sediments and Meghalaya piedmont gravels
    geologicalNote: "TODO: Surma basin fluvio-deltaic sediments, wetland depression geomorphology, and piedmont alluvial gravel beds.",
    coverImage: null,
    story: null,
    galleryImages: [],
    categories: ["Rivers", "Nature", "Geological Exploration"],
    journalPublished: false,
  },
  {
    id: "dest-chittagong",
    slug: "chittagong",
    name: "Chittagong (Chattogram)",
    country: "Bangladesh",
    district: "Chattogram",
    region: "Chattogram Division",
    latitude: 22.3569,
    longitude: 91.7832,
    visitDate: null,
    tagline: "The Port City",
    shortDescription:
      "Historic maritime gateway and primary port city, uniquely situated between the tertiary anticlines of the Chittagong Hill Tracts and the Karnaphuli estuary.",
    // TODO: Verify observations on folded Tertiary anticlinal ridges and Karnaphuli estuary
    geologicalNote: "TODO: Folded Tertiary sandstone-shale sequences of Chittagong hills and estuarine tidal siltation.",
    coverImage: null,
    story: null,
    galleryImages: [],
    categories: ["Adventure", "Nature"],
    journalPublished: false,
  },
  {
    id: "dest-patenga-beach",
    slug: "patenga-sea-beach",
    name: "Patenga Sea Beach",
    country: "Bangladesh",
    district: "Chattogram",
    region: "Chattogram Division",
    latitude: 22.2289,
    longitude: 91.7915,
    visitDate: null,
    tagline: "Where Sea Meets Sky",
    shortDescription:
      "Distinct coastal shore located 14 km south of Chattogram city center at the mouth of the Karnaphuli River meeting the open marine waters of the Bay of Bengal.",
    // TODO: Verify coastal wave interaction and river-mouth sediment deposition
    geologicalNote: "TODO: River-mouth deltaic deposition, coastal rip-rap stabilization, and tidal range observations.",
    coverImage: null,
    story: null,
    galleryImages: [],
    categories: ["Beaches", "Rivers", "Nature"],
    journalPublished: false,
  },
  {
    id: "dest-pabna",
    slug: "pabna",
    name: "Pabna",
    country: "Bangladesh",
    district: "Pabna",
    region: "Rajshahi Division",
    latitude: 24.0064,
    longitude: 89.2372,
    visitDate: null,
    tagline: "Land of Rivers",
    shortDescription:
      "Southern Rajshahi division plain situated along the northern banks of the Padma River, marked by expansive active river floodplains and fertile alluvial silt.",
    // TODO: Verify observations on active Padma River braid bars and alluvial siltation
    geologicalNote: "TODO: Active channel bar (char) morphodynamics, floodplain alluvium, and sand-silt stratification along the Padma River.",
    coverImage: null,
    story: null,
    galleryImages: [],
    categories: ["Rivers", "Nature"],
    journalPublished: false,
  },
  {
    id: "dest-natore",
    slug: "natore",
    name: "Natore",
    country: "Bangladesh",
    district: "Natore",
    region: "Rajshahi Division",
    latitude: 24.4102,
    longitude: 88.9796,
    visitDate: null,
    tagline: "Historical Heritage",
    shortDescription:
      "Historic Barind tract region bordering the vast Chalan Beel depression, characterized by older Pleistocene pleistocene clay terraces and inland wetland systems.",
    // TODO: Verify Barind clay observations and Chalan Beel depression hydrology
    geologicalNote: "TODO: Pleistocene Madhupur/Barind red-brown clay terrace soils and inland depression (beel) hydrology.",
    coverImage: null,
    story: null,
    galleryImages: [],
    categories: ["Nature", "Geological Exploration"],
    journalPublished: false,
  },
  {
    id: "dest-mymensingh",
    slug: "mymensingh",
    name: "Mymensingh",
    country: "Bangladesh",
    district: "Mymensingh",
    region: "Mymensingh Division",
    latitude: 24.7471,
    longitude: 90.4203,
    visitDate: null,
    tagline: "The Cultural City",
    shortDescription:
      "Old Brahmaputra river terrace landscape situated in north-central Bangladesh, transitioning towards the Piedmont alluvial fans beneath the Garo Hills borderland.",
    // TODO: Verify Old Brahmaputra river terrace soils and sediment horizons
    geologicalNote: "TODO: Old Brahmaputra floodplain terrace sequence, sandy-loam soil profiles, and regional river diversion history.",
    coverImage: null,
    story: null,
    galleryImages: [],
    categories: ["Rivers", "Nature"],
    journalPublished: false,
  },
  {
    id: "dest-cumilla",
    slug: "cumilla",
    name: "Cumilla",
    country: "Bangladesh",
    district: "Cumilla",
    region: "Chattogram Division",
    latitude: 23.4607,
    longitude: 91.1809,
    visitDate: null,
    tagline: "Rich in Heritage",
    shortDescription:
      "Eastern Bangladesh floodplain region featuring the prominent Lalmai-Mainamati anticline ridge, with uplifted red Pleistocene sediments rich in weathered iron minerals.",
    // TODO: Verify Lalmai anticline ridge observations, weathered iron-rich clay, and terrace deposits
    geologicalNote: "TODO: Lalmai Hills uplifted Pleistocene terrace sediments, ferricrete weathering zones, and structural anticlinal axis.",
    coverImage: null,
    story: null,
    galleryImages: [],
    categories: ["Nature", "Adventure"],
    journalPublished: false,
  },
];

/**
 * Calculate dynamic travel statistics directly from verified data.
 * Computes exact counts without hardcoding or fabricating numbers.
 */
export function getTravelStatistics(
  destinations: Destination[],
  homeBase: HomeBase = HOME_BASE
): TravelStatistics {
  const placesExplored = destinations.length; // Exactly 9
  const travelStories = destinations.filter(
    (d) => d.journalPublished && d.story && d.story.narrative && d.story.narrative.length > 0
  ).length;
  const photographs = destinations.reduce(
    (total, d) => total + (d.galleryImages ? d.galleryImages.length : 0),
    0
  );

  const regionSet = new Set(destinations.map((d) => d.region).filter(Boolean));
  const regionNames = Array.from(regionSet);
  const regionsExplored = regionSet.size;

  return {
    placesExplored,
    homeBaseName: homeBase.name,
    travelStories,
    photographs,
    regionsExplored,
    regionNames,
  };
}

export const TRAVEL_CATEGORIES: TravelCategory[] = [
  "All",
  "Mountains",
  "Rivers",
  "Forests",
  "Beaches",
  "Nature",
  "Adventure",
  "Geological Exploration",
];
