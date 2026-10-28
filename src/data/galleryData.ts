/**
 * Authentic Geological Background Gallery Data
 * Verified local geological assets depicting formations, natural landscapes,
 * field geology reconnaissance, GIS terrain analysis, and mineralogy.
 */

export interface GeologicalSlide {
  id: string;
  title: string;
  category:
    | "Sedimentary Strata"
    | "Geological Landscape"
    | "Field Geology"
    | "GIS & Terrain"
    | "Mineralogy"
    | "Hydrogeology";
  formation: string;
  src: string;
  alt: string;
  attribution: string;
  license: string;
  description: string;
}

export const GEOLOGICAL_GALLERY: GeologicalSlide[] = [
  {
    id: "strata-outcrop",
    title: "Sedimentary Rock Strata",
    category: "Sedimentary Strata",
    formation: "Bedded Sedimentary Outcrop & Weathered Escarpment",
    src: "/images/geology/strata-outcrop.jpg",
    alt: "Exposed vertical rock cliff showcasing prominent rhythmic sedimentary strata layers and weathering surfaces",
    attribution: "User-Supplied Geological Photograph",
    license: "Academic Portfolio Presentation / Personal Collection",
    description: "Stratified sedimentary rock sequence exhibiting rhythmic bedding, differential weathering, and planar joints.",
  },
  {
    id: "geological-landscape",
    title: "Structural Geological Landscape",
    category: "Geological Landscape",
    formation: "Regional Folded Terrane & Fluvial Drainage Basin",
    src: "/images/geology/geological-landscape.jpg",
    alt: "Vast aerial landscape of folded geological formations with dendritic drainage networks and structural ridges",
    attribution: "User-Supplied Geological Photograph",
    license: "Academic Portfolio Presentation / Personal Collection",
    description: "Panoramic geomorphological terrain showing structural folding, resistant ridge crests, and dendritic drainage channels.",
  },
  {
    id: "field-geology",
    title: "Field Geology & Outcrop Inspection",
    category: "Field Geology",
    formation: "Lithological Contact & In-Situ Structural Station",
    src: "/images/geology/field-geology.jpg",
    alt: "Field geologist in safety helmet and jacket examining exposed rock strata with a geological hammer",
    attribution: "User-Supplied Geological Photograph",
    license: "Academic Portfolio Presentation / Personal Collection",
    description: "In-situ rock mass examination, lithological logging, and bedding orientation analysis during field excursion.",
  },
  {
    id: "gis-terrain",
    title: "Digital Elevation Model & GIS Terrain",
    category: "GIS & Terrain",
    formation: "Topographic Relief & Watershed Catchment Model",
    src: "/images/geology/gis-terrain.jpg",
    alt: "Color-coded digital elevation model (DEM) displaying watershed topography, slope steepness, and river networks",
    attribution: "User-Supplied Geospatial Terrain Dataset",
    license: "Academic Portfolio Presentation / Personal Collection",
    description: "High-resolution DEM displaying structural topography, slope gradient analysis, and fluvial drainage basins.",
  },
  {
    id: "mineral-specimen",
    title: "Quartz & Sulfide Mineral Specimen",
    category: "Mineralogy",
    formation: "Hydrothermal Pyrite Crystals in Quartz Matrix",
    src: "/images/geology/mineral-specimen.jpg",
    alt: "Close-up macro photograph of a geological mineral specimen displaying metallic golden pyrite crystals nestled in crystalline quartz",
    attribution: "User-Supplied Mineral Specimen Photograph",
    license: "Academic Portfolio Presentation / Personal Collection",
    description: "Intergrown cubic and pyritohedral pyrite crystals hosted in white quartz, demonstrating hydrothermal mineral crystallization.",
  },
];
