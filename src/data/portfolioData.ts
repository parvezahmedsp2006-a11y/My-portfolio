/**
 * Academic & Personal Portfolio Data
 * Centralized, verifiable data source designed for clear, authentic presentation.
 * Reflects verified details from Parvez Ahmed's undergraduate studies
 * in Geology & Mining at the University of Rajshahi, personal web development
 * projects, and future learning goals.
 */

export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  role: string;
  timeline: string;
  problemStatement: string;
  verifiedContributions: {
    title: string;
    description: string;
  }[];
  myContribution: string[];
  technologies: { category: string; stack: string[] }[];
  status: "Completed MVP" | "Ongoing Development" | "Research Prototype";
  statusNote: string;
  testSuiteEvidence: string;
  githubUrl: string;
  liveUrl?: string;
  keyFeatures: { title: string; description: string }[];
  technicalDecisions: { title: string; detail: string }[];
}

export interface ResearchInterest {
  title: string;
  shortDesc: string;
  extendedDesc: string;
  focusTopics: string[];
  scientificInquiry: string;
  iconName: string;
}

export interface CourseworkPhase {
  category: string;
  academicYear: string;
  status: "Completed Coursework" | "Current / Upcoming Coursework";
  topics: string[];
  description: string;
}

export interface SkillItem {
  name: string;
  level: "Currently Using" | "Learning" | "Familiar With" | "Planning to Explore";
  note: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface PortfolioData {
  personal: {
    name: string;
    headline: string;
    subheadline: string;
    department: string;
    institution: string;
    program: string;
    email: string;
    githubUsername: string;
    githubUrl: string;
    location: string;
    portraitImage: string;
    portraitAlt: string;
    bioOverview: string[];
  };
  researchInterests: ResearchInterest[];
  technicalProjects: ProjectCaseStudy[];
  featuredProject: ProjectCaseStudy;
  coursework: CourseworkPhase[];
  skills: SkillCategory[];
  futureGoals: {
    timeframe: string;
    stage: string;
    title: string;
    description: string;
    keyDeliverables: string[];
  }[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: "Parvez Ahmed",
    headline: "Undergraduate in Geology & Mining · Aspiring Full-Stack Developer",
    subheadline:
      "Undergraduate student in Geology & Mining at the University of Rajshahi with a keen interest in earth processes and modern web development. Building practical tools and working toward becoming a full-stack developer.",
    department: "Department of Geology and Mining",
    institution: "University of Rajshahi",
    program: "B.Sc. (Hons.) in Geology and Mining",
    email: "parvezahmed.sp2006@gmail.com",
    githubUsername: "parvezahmedsp2006-a11y",
    githubUrl: "https://github.com/parvezahmedsp2006-a11y",
    location: "Rajshahi, Bangladesh",
    portraitImage: "/images/portrait/hero-portrait.png",
    portraitAlt:
      "Portrait illustration of Parvez Ahmed against a warm sunset aesthetic",
    bioOverview: [
      "I am an undergraduate student in Geology and Mining at the University of Rajshahi. I am drawn to understanding the Earth's physical processes, geological formations, and natural resources.",
      "Alongside earth science, I have developed a strong passion for web development. I enjoy building practical digital products, including the GeoMine Resource Hub, an educational platform I designed to organize departmental materials for students.",
      "My long-term goal is to grow into a skilled full-stack developer and build my own web development business. I am continually learning modern web technologies and creating digital tools that solve everyday problems.",
    ],
  },

  // 4 Academic Interests grounded in undergraduate studies
  researchInterests: [
    {
      title: "Hydrogeology",
      shortDesc:
        "Aquifer characteristics, groundwater flow, and regional water resource sustainability.",
      extendedDesc:
        "Studying aquifer dynamics, recharge mechanisms, and groundwater behavior in alluvial plains to understand water sustainability.",
      focusTopics: [
        "Sedimentary Aquifer Systems",
        "Groundwater Recharge & Flow",
        "Water Quality & Hydrogeochemistry",
        "Alluvial Basin Water Balance",
      ],
      scientificInquiry:
        "How do seasonal recharge variations and sediment layering influence groundwater availability and quality in alluvial basins?",
      iconName: "Droplets",
    },
    {
      title: "Mineral Resources",
      shortDesc:
        "Economic geology, mineral formation, and responsible resource extraction.",
      extendedDesc:
        "Examining the geological processes behind metallic and industrial mineral deposits, emphasizing sustainable exploration practices.",
      focusTopics: [
        "Economic Mineralogy & Rock Types",
        "Placer & Sedimentary Deposits",
        "Mineral Identification & Ore Petrology",
        "Responsible Mineral Exploration",
      ],
      scientificInquiry:
        "What geological conditions and hydrodynamic processes lead to the concentration of valuable heavy minerals in river systems?",
      iconName: "Pickaxe",
    },
    {
      title: "Petroleum Geology",
      shortDesc:
        "Sedimentary basin formation, reservoir rocks, and subsurface energy systems.",
      extendedDesc:
        "Exploring how sedimentary basins evolve over time, how source rocks mature, and what factors determine reservoir porosity and permeability.",
      focusTopics: [
        "Sedimentary Basin Evolution",
        "Reservoir Rocks & Porosity",
        "Stratigraphic & Structural Trapping",
        "Basic Well-Log Principles",
      ],
      scientificInquiry:
        "How do sediment compaction and mineral cementation influence fluid storage and movement in sandstone reservoirs?",
      iconName: "Flame",
    },
    {
      title: "GIS & Remote Sensing",
      shortDesc:
        "Satellite imagery, digital elevation models, and spatial geological mapping.",
      extendedDesc:
        "Learning to use satellite imagery and digital elevation data to analyze surface landforms, structural lineaments, and geological features.",
      focusTopics: [
        "Satellite Image Interpretation",
        "Digital Elevation Model (DEM) Analysis",
        "Geological Surface Mapping",
        "Spatial Data for Water & Land",
      ],
      scientificInquiry:
        "How effectively can digital elevation models and satellite data assist in mapping geological structures across flat plains?",
      iconName: "Compass",
    },
  ],

  technicalProjects: [
    {
      id: "geomine",
      title: "GeoMine Resource Hub",
      category: "Full-Stack Web Application · Educational Platform",
      subtitle: "Departmental Academic Resource Platform for Geology & Mining Students",
      description:
        "A full-stack web application designed to help geology and mining students easily access course materials, lecture notes, syllabi, and academic resources in one organized portal.",
      role: "Creator & Developer",
      timeline: "Personal Project · Ongoing Development",
      problemStatement:
        "Departmental study materials, past exam questions, and lecture slides were often scattered across informal chat groups and unorganized personal drives. GeoMine Resource Hub centralizes these resources into a structured, searchable catalog aligned with the department's syllabus.",
      verifiedContributions: [
        {
          title: "Full-Stack Application Architecture",
          description:
            "Built using Next.js 16 App Router, React 19, TypeScript, and Prisma ORM for a type-safe and modular web application.",
        },
        {
          title: "Curriculum Navigation Hierarchy",
          description:
            "Structured an 8-semester course navigation (Year → Semester → Course → Resources) mirroring the official B.Sc. (Hons.) curriculum.",
        },
        {
          title: "In-Browser PDF Document Viewing",
          description:
            "Integrated document previewing with zoom, page navigation, fit-to-width, and direct download capabilities.",
        },
        {
          title: "Role-Based Upload Pipeline",
          description:
            "Implemented an upload workflow allowing student Course Representatives to submit materials for administrative review.",
        },
        {
          title: "Automated Testing Suite",
          description:
            "Wrote 20 Vitest test suites (153 tests) verifying database schemas, role authorization, and API route security.",
        },
      ],
      myContribution: [
        "Built the full-stack web application using Next.js 16 App Router and TypeScript.",
        "Created normalized Prisma schemas supporting SQLite in local development and PostgreSQL for production.",
        "Designed the 8-semester curriculum navigation matching the B.Sc. (Hons.) syllabus.",
        "Integrated an in-browser PDF viewer with preview, zoom, page controls, and download options.",
        "Implemented Course Representative upload workflows with administrative controls.",
        "Wrote 20 Vitest test suites (153 passing tests) covering data models, permissions, and API endpoints.",
      ],
      technologies: [
        {
          category: "Frontend & UI",
          stack: ["Next.js 16 (App Router)", "React 19", "Tailwind CSS v4", "Lucide React"],
        },
        {
          category: "Backend & Data",
          stack: ["TypeScript", "Prisma ORM", "SQLite (Local)", "PostgreSQL (Production)"],
        },
        {
          category: "Security & Testing",
          stack: ["JWT Authentication", "Bcrypt.js", "Vitest (153 Tests)"],
        },
      ],
      status: "Completed MVP",
      statusNote:
        "Developed and verified in local development with 20 Vitest test suites (153 tests). The complete source code is maintained on GitHub; live server deployment is planned.",
      testSuiteEvidence: "20 passing test suites (153 unit and integration tests) verifying database models, authentication, and API endpoints",
      githubUrl: "https://github.com/parvezahmedsp2006-a11y/geo-mine-resource-hub",
      keyFeatures: [
        {
          title: "8-Semester Curriculum Hierarchy",
          description:
            "Organized by academic year, semester, and course codes matching the official B.Sc. (Hons.) curriculum.",
        },
        {
          title: "In-Browser PDF Viewer",
          description:
            "Direct document preview with zoom, fit-to-width, pagination, and downloading options.",
        },
        {
          title: "Course Representative Upload Workflow",
          description:
            "Allows student representatives to submit slides and lecture notes with administrative review.",
        },
        {
          title: "Structured Resource Search",
          description:
            "Filter materials by course code, material type (Notes, Questions, Lab Guides), and file format.",
        },
      ],
      technicalDecisions: [
        {
          title: "Dual Database Strategy",
          detail:
            "Configured Prisma schemas for fast local development with SQLite and reproducible PostgreSQL migrations for production.",
        },
        {
          title: "Role-Scoped Access Control",
          detail:
            "Enforced server-side checks so student representatives can only upload to their assigned semesters, preventing unauthorized edits.",
        },
        {
          title: "Accessible and Clean Interface",
          detail:
            "Designed a clean, readable user interface with strong contrast, clear typography, and keyboard navigation.",
        },
      ],
    },
  ],

  get featuredProject() {
    return this.technicalProjects[0];
  },

  coursework: [
    {
      category: "Fundamental Earth Sciences",
      academicYear: "1st Year Undergraduate",
      status: "Completed Coursework",
      description:
        "Built core foundational knowledge of physical geological processes, landform development, and mineral crystal structures.",
      topics: [
        "Physical & General Geology",
        "Mineralogy & Crystallography",
        "Geomorphology & Surface Dynamics",
        "Optical Mineralogy & Petrology Labs",
      ],
    },
    {
      category: "Core Geological Disciplines",
      academicYear: "2nd Year Undergraduate",
      status: "Completed Coursework",
      description:
        "Deepened understanding of rock formations, deformation tectonics, sedimentary layering, and fossil records.",
      topics: [
        "Sedimentary & Metamorphic Petrology",
        "Structural Geology & Tectonics",
        "Stratigraphy & Historical Geology",
        "Invertebrate Paleontology",
      ],
    },
    {
      category: "Applied & Practical Geosciences",
      academicYear: "3rd & 4th Year Undergraduate",
      status: "Current / Upcoming Coursework",
      description:
        "Applying geological principles to groundwater systems, energy resources, spatial mapping, and mining operations.",
      topics: [
        "Hydrogeology & Groundwater Resources",
        "Mining Geology & Mineral Economics",
        "Petroleum Geology & Basin Evaluation",
        "Geophysics & Remote Sensing / GIS",
      ],
    },
  ],

  skills: [
    {
      category: "Web Development & Programming",
      items: [
        {
          name: "Next.js 16 & React 19",
          level: "Currently Using",
          note: "Building full-stack projects using the App Router, server components, and responsive layouts.",
        },
        {
          name: "TypeScript & JavaScript",
          level: "Currently Using",
          note: "Writing type-safe code, explicit interfaces, and asynchronous functions.",
        },
        {
          name: "Tailwind CSS",
          level: "Currently Using",
          note: "Creating responsive, accessible, and clean user interfaces with modern styling.",
        },
        {
          name: "Prisma ORM & SQL Databases",
          level: "Currently Using",
          note: "Defining database schemas, handling relationships, and running migrations with SQLite and PostgreSQL.",
        },
        {
          name: "Git & GitHub",
          level: "Currently Using",
          note: "Managing version control, branches, atomic commits, and maintaining open-source code.",
        },
        {
          name: "Python",
          level: "Learning",
          note: "Studying basic scripting and data manipulation for geological and computational datasets.",
        },
      ],
    },
    {
      category: "Geological Knowledge & Fieldwork",
      items: [
        {
          name: "Physical Geology & Geomorphology",
          level: "Familiar With",
          note: "Understanding earth surface dynamics, weathering processes, and landscape evolution.",
        },
        {
          name: "Mineralogy & Optical Petrology",
          level: "Familiar With",
          note: "Identifying hand-specimen minerals and examining rock thin-sections under petrographic microscopes.",
        },
        {
          name: "Structural Geology & Stratigraphy",
          level: "Familiar With",
          note: "Studying rock deformation, faults, folds, and sedimentary layer sequences.",
        },
        {
          name: "Hydrogeology & Water Resources",
          level: "Learning",
          note: "Studying aquifer properties, groundwater flow mechanisms, and water resource management.",
        },
        {
          name: "Geological Field Measurement",
          level: "Familiar With",
          note: "Practicing compass use, strike and dip measurements, and outcrop observations in departmental excursions.",
        },
        {
          name: "GIS & Remote Sensing",
          level: "Planning to Explore",
          note: "Exploring satellite imagery and spatial data tools for geological mapping and environmental monitoring.",
        },
      ],
    },
    {
      category: "Tools & Working Practices",
      items: [
        {
          name: "VS Code & Development Tools",
          level: "Currently Using",
          note: "Primary working environment for TypeScript, React, and Next.js development.",
        },
        {
          name: "Automated Testing (Vitest)",
          level: "Currently Using",
          note: "Writing unit and integration test suites to verify database queries and API endpoints.",
        },
        {
          name: "Technical Documentation",
          level: "Currently Using",
          note: "Documenting application architecture, setup guides, and repository READMEs clearly.",
        },
        {
          name: "Curriculum Organization",
          level: "Currently Using",
          note: "Structuring complex academic course materials logically, demonstrated in the GeoMine Resource Hub.",
        },
      ],
    },
  ],

  futureGoals: [
    {
      timeframe: "Near-Term",
      stage: "Undergraduate Studies & Web Foundations",
      title: "Completing Undergraduate Studies & Strengthening Web Foundations",
      description:
        "Focusing on completing coursework in Geology & Mining at the University of Rajshahi while consistently building hands-on web projects using Next.js, React, and TypeScript.",
      keyDeliverables: [
        "Complete departmental coursework in hydrogeology, structural geology, and mineral resources.",
        "Maintain and refine the GeoMine Resource Hub repository with clean documentation and tests.",
        "Deepen practical understanding of backend development, API design, and database workflows.",
      ],
    },
    {
      timeframe: "Medium-Term",
      stage: "Full-Stack Development & Practical Tools",
      title: "Full-Stack Competencies & Practical Digital Products",
      description:
        "Advancing toward becoming a full-stack developer by building practical digital products, mastering backend architecture, and understanding production deployments.",
      keyDeliverables: [
        "Master advanced full-stack concepts, including serverless architecture, authentication, and caching.",
        "Build and deploy practical web applications that solve specific problems for students and everyday users.",
        "Gain experience with cloud hosting platforms and automated continuous integration workflows.",
      ],
    },
    {
      timeframe: "Long-Term",
      stage: "Digital Products & Web Development Business",
      title: "Building Practical Products & Developing a Web Business",
      description:
        "Applying combined problem-solving skills to build sustainable digital products and establish an independent web development business, alongside a lifelong appreciation for earth sciences.",
      keyDeliverables: [
        "Develop independent web products that provide tangible value to clients and communities.",
        "Establish an independent web development business focused on modern, accessible, and reliable software.",
        "Continue connecting real-world problem solving with modern software engineering.",
      ],
    },
  ],
};
