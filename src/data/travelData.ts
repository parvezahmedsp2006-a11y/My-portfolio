/**
 * Travel Data Architecture — Beyond the Horizon
 *
 * Strongly typed, modular data source for Parvez Ahmed's personal travel experiences.
 * All destinations, journal entries, and photography galleries are configured here.
 *
 * User constraint:
 * Never hardcode or invent fictional personal travel records or stock photographs.
 * When TRAVEL_DESTINATIONS is empty, the UI renders polished, luxury editorial empty states.
 * Real travel entries can be added by populating TRAVEL_DESTINATIONS.
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
  date?: string;
  location?: string;
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
  region: string;
  visitDate: string;
  latitude: number;
  longitude: number;
  coverImage?: string;
  shortDescription: string;
  story: TravelStory;
  galleryImages: GalleryImage[];
  categories: TravelCategory[];
}

export interface TravelStatistics {
  placesExplored: number;
  travelStories: number;
  photographs: number;
  regionsExplored: number;
}

/**
 * Real Personal Travel Destinations
 * Defaults to an empty list until personal travel records and photos are provided.
 */
export const TRAVEL_DESTINATIONS: Destination[] = [];

/**
 * Calculate dynamic travel statistics directly from verified data.
 * Returns 0 across metrics when no records exist.
 */
export function getTravelStatistics(destinations: Destination[]): TravelStatistics {
  const placesExplored = destinations.length;
  const travelStories = destinations.filter(
    (d) => d.story && d.story.narrative && d.story.narrative.length > 0
  ).length;
  const photographs = destinations.reduce(
    (total, d) => total + (d.galleryImages ? d.galleryImages.length : 0),
    0
  );
  const regionsExplored = new Set(
    destinations
      .map((d) => `${d.country}-${d.region}`.trim())
      .filter((s) => s.length > 1)
  ).size;

  return {
    placesExplored,
    travelStories,
    photographs,
    regionsExplored,
  };
}

/**
 * Verified categories for filtration in Photography Archive
 */
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

/**
 * Template schema for adding new destinations in the future.
 * Duplicate this structure and append it to TRAVEL_DESTINATIONS.
 */
export const TRAVEL_DESTINATION_TEMPLATE: Destination = {
  id: "dest-template",
  slug: "destination-slug",
  name: "Destination Name",
  country: "Bangladesh",
  region: "District / Division",
  visitDate: "Month Year",
  latitude: 24.3636, // Decimal degrees
  longitude: 88.6241,
  coverImage: "/images/travel/destination-cover.jpg",
  shortDescription:
    "A concise two-sentence summary of the journey and geological setting.",
  story: {
    introduction:
      "Contextual setting of the excursion, timing, and personal motivation.",
    narrative: [
      "First paragraph describing arrival, terrain, and atmospheric impressions.",
      "Second paragraph recounting field observations and navigation.",
      "Concluding reflections on what made this horizon memorable.",
    ],
    observations: [
      "Key scientific or geological observation of the terrain.",
      "Local environmental characteristics and cultural markers.",
    ],
    memorableMoments: [
      "Memorable twilight reflection or field breakthrough.",
      "Shared moments and quiet horizon perspectives.",
    ],
  },
  galleryImages: [
    {
      id: "img-01",
      url: "/images/travel/sample-photo-01.jpg",
      caption: "Description of the landscape or geological feature",
      category: "Nature",
      date: "Month Year",
      location: "Specific location name",
    },
  ],
  categories: ["Nature", "Geological Exploration"],
};
