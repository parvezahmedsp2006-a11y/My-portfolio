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
  shortDescription: string;
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
    shortDescription:
      "The world's longest unbroken natural sandy sea beach, characterized by dynamic marine littoral processes and coastal cliffs along the Bay of Bengal.",
    coverImage: null,
    story: null,
    galleryImages: [],
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
    shortDescription:
      "The tea capital of Bangladesh, defined by rolling terraced tea estates, Lawachara rainforest ecosystems, and humid sub-tropical microclimates.",
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
    shortDescription:
      "Surma River basin plain bounded by the Meghalaya plateau foothills, featuring wetland haors, gravel riverbeds, and heavy monsoon runoff channels.",
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
    shortDescription:
      "Historic maritime gateway and primary port city, uniquely situated between the tertiary anticlines of the Chittagong Hill Tracts and the Karnaphuli estuary.",
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
    shortDescription:
      "Distinct coastal shore located 14 km south of Chattogram city center at the mouth of the Karnaphuli River meeting the open marine waters of the Bay of Bengal.",
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
    shortDescription:
      "Southern Rajshahi division plain situated along the northern banks of the Padma River, marked by expansive active river floodplains and fertile alluvial silt.",
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
    shortDescription:
      "Historic Barind tract region bordering the vast Chalan Beel depression, characterized by older Pleistocene pleistocene clay terraces and inland wetland systems.",
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
    shortDescription:
      "Old Brahmaputra river terrace landscape situated in north-central Bangladesh, transitioning towards the Piedmont alluvial fans beneath the Garo Hills borderland.",
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
    shortDescription:
      "Eastern Bangladesh floodplain region featuring the prominent Lalmai-Mainamati anticline ridge, with uplifted red Pleistocene sediments rich in weathered iron minerals.",
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
