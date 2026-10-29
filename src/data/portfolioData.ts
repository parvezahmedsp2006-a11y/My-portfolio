/**
 * Academic & Research Portfolio Data
 * Centralized, verifiable data source designed for easy beginner editing.
 * Strictly reflects verified details from Parvez Ahmed's academic journey
 * and development repositories.
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
  skills: {
    category: string;
    items: {
      name: string;
      level: "Core Foundation" | "Proficient" | "Developing";
      note: string;
    }[];
  }[];
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
    headline: "Exploring the Earth. Understanding Our Resources.",
    subheadline:
      "Undergraduate student in Geology & Mining at the University of Rajshahi, bridging field geoscience with computational problem-solving to prepare for graduate research in earth and resource sciences.",
    department: "Department of Geology and Mining",
    institution: "University of Rajshahi",
    program: "B.Sc. (Hons.) in Geology and Mining",
    email: "parvezahmed.sp2006@gmail.com",
    githubUsername: "parvezahmedsp2006-a11y",
    githubUrl: "https://github.com/parvezahmedsp2006-a11y",
    location: "Rajshahi, Bangladesh",
    portraitImage: "/images/portrait/parvez-ahmed-formal-portrait.png",
    portraitAlt:
      "Academic portrait of Parvez Ahmed, undergraduate Geology & Mining student and aspiring researcher at the University of Rajshahi",
    bioOverview: [
      "I am an undergraduate in Geology and Mining at the University of Rajshahi, studying subsurface systems, mineral formation, and quantitative methods in earth sciences.",
      "Alongside field mapping and laboratory petrography, I built the GeoMine Resource Hub—a full-stack platform organizing departmental curricula into a searchable, accessible digital archive.",
      "My goal is to graduate with strong foundations across hydrogeology, mineral systems, petroleum geology, and GIS, preparing for competitive international MSc scholarships and graduate research.",
    ],
  },

  // Exactly matches the user's 4 confirmed research interests
  researchInterests: [
    {
      title: "Hydrogeology",
      shortDesc:
        "Aquifer characterization, groundwater flow dynamics, and regional water resource sustainability.",
      extendedDesc:
        "Investigating aquifer hydrodynamics, recharge patterns, and hydrogeochemical factors that govern groundwater availability in alluvial basins.",
      focusTopics: [
        "Sedimentary Aquifer Hydrodynamics",
        "Groundwater Recharge & Vulnerability",
        "Hydrogeochemical Evolution",
        "Alluvial Basin Water Balance",
      ],
      scientificInquiry:
        "How do seasonal recharge variations and sediment heterogeneities control groundwater storage and quality in alluvial basins?",
      iconName: "Droplets",
    },
    {
      title: "Mineral Resources",
      shortDesc:
        "Economic geology, ore petrogenesis, and responsible extraction of critical minerals.",
      extendedDesc:
        "Examining the genesis, structural controls, and mineralogy of metallic and industrial deposits, balancing resource potential with environmental stewardship.",
      focusTopics: [
        "Economic Mineralogy & Ore Petrology",
        "Placer & Sedimentary Deposit Systems",
        "Hydrothermal & Metamorphic Mineralization",
        "Environmental Remediation in Mining",
      ],
      scientificInquiry:
        "What geological and hydrodynamic mechanisms govern the concentration of heavy mineral sands in fluvial-alluvial systems?",
      iconName: "Pickaxe",
    },
    {
      title: "Petroleum Geology",
      shortDesc:
        "Sedimentary basin analysis, source rock maturation, and reservoir characterization.",
      extendedDesc:
        "Analyzing petroleum system components: source-rock maturation, reservoir porosity-permeability relationships, and structural/stratigraphic trapping mechanisms.",
      focusTopics: [
        "Sedimentary Basin Evolution",
        "Reservoir Petrophysics & Lithofacies",
        "Structural & Stratigraphic Trapping",
        "Well-Log Interpretation Fundamentals",
      ],
      scientificInquiry:
        "How do diagenetic compaction and cementation govern secondary porosity and permeability in deltaic sandstones?",
      iconName: "Flame",
    },
    {
      title: "GIS & Remote Sensing",
      shortDesc:
        "Satellite image interpretation, digital elevation models, and spatial geoscience analysis.",
      extendedDesc:
        "Applying multispectral satellite imagery, DEM surface analysis, and spatial mapping to extract structural lineaments and monitor surface changes.",
      focusTopics: [
        "Multispectral Geological Mapping",
        "DEM Geomorphological Analysis",
        "Structural Lineament Extraction",
        "Spatial Hydrological Modeling",
      ],
      scientificInquiry:
        "How effectively can automated lineament extraction from multispectral imagery and DEMs improve structural mapping in sediment-covered plains?",
      iconName: "Compass",
    },
  ],

  technicalProjects: [
    {
      id: "geomine",
      title: "GeoMine Resource Hub",
      category: "Full-Stack Web Application · Educational Technology",
      subtitle: "Departmental Academic Resource Platform & Document Portal",
      description:
        "A full-stack departmental platform that organizes geology and mining course materials, syllabi, and academic archives into an accessible digital portal.",
      role: "Sole Creator & Full-Stack Developer",
      timeline: "2024 – Present (Active MVP)",
      problemStatement:
        "Course materials, examination archives, and syllabi were scattered across informal messaging groups and disconnected drives. GeoMine provides a single, searchable archive structured by official curriculum.",
      verifiedContributions: [
        {
          title: "Full-stack application architecture",
          description:
            "Engineered with Next.js 16 App Router, React 19, TypeScript, and Prisma ORM for type-safe rendering and schema management.",
        },
        {
          title: "Curriculum navigation hierarchy",
          description:
            "Designed an 8-semester curriculum structure (Year → Semester → Course → Resources) aligned with departmental syllabi.",
        },
        {
          title: "In-browser PDF viewing",
          description:
            "Integrated zero-friction PDF previewing with zoom, fit-to-width, pagination, and direct downloading.",
        },
        {
          title: "Role-scoped upload workflow",
          description:
            "Developed authentication allowing Course Representatives (CR) to contribute materials with administrative audit oversight.",
        },
        {
          title: "Automated test verification",
          description:
            "Authored 20 automated Vitest regression and unit test suites (153 passing tests) covering schema compatibility, CR authorization, and route security.",
        },
      ],
      myContribution: [
        "Engineered the full-stack web application using Next.js 16 App Router and TypeScript.",
        "Designed normalized Prisma schemas supporting SQLite in development and PostgreSQL in production.",
        "Built the 8-semester curriculum navigation hierarchy matching the B.Sc. (Hons.) syllabus.",
        "Integrated an in-browser PDF viewer with instant preview, zoom, page navigation, and download.",
        "Implemented role-aware Course Representative (CR) upload workflows with administrative controls.",
        "Configured Google Gemini AI assistant for curriculum-grounded queries.",
        "Authored 20 Vitest test suites (153 passing tests) covering schema, auth, and API routes.",
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
          category: "Security & AI",
          stack: ["Jose / JWT Authentication", "Bcrypt.js", "Google Gemini AI API"],
        },
      ],
      status: "Completed MVP",
      statusNote:
        "Verified local MVP with 20 automated test suites (153 passing tests) passing cleanly; active open-source repository on GitHub. Tested in local development; cloud deployment pending institutional server allocation.",
      testSuiteEvidence: "20 passing regression and unit test suites (153 tests) across schema, auth, and API routes",
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
            "Zero-friction document preview with zoom, fit-to-width, pagination, and direct download capabilities.",
        },
        {
          title: "Course Representative Upload Pipeline",
          description:
            "Semester-scoped upload permissions allowing student CRs to upload course slides with admin review.",
        },
        {
          title: "Multi-Facet Resource Filtering",
          description:
            "Real-time search across course codes, categories (Lecture Notes, Exam Questions, Lab Manuals), and file formats.",
        },
      ],
      technicalDecisions: [
        {
          title: "Dual Database Strategy",
          detail:
            "Designed Prisma schemas for local SQLite zero-friction development alongside idempotent PostgreSQL production migrations.",
        },
        {
          title: "Granular Role-Based Access",
          detail:
            "Enforced strict server-side role validation preventing author spoofing and scoping CR file management strictly to their assigned academic semester.",
        },
        {
          title: "Accessible Editorial Aesthetic",
          detail:
            "Developed mineral-toned accessible design tokens achieving WCAG 2.1 AA compliance with high-contrast typography and keyboard navigation.",
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
        "Established core observational and physical principles of planetary systems, crystal structures, and geomorphic landforms.",
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
        "Deepened understanding of rock formations, deformation tectonics, sedimentary history, and fossil records.",
      topics: [
        "Sedimentary & Metamorphic Petrology",
        "Structural Geology & Tectonics",
        "Stratigraphy & Historical Geology",
        "Invertebrate Paleontology",
      ],
    },
    {
      category: "Applied & Quantitative Geosciences",
      academicYear: "3rd & 4th Year Undergraduate",
      status: "Current / Upcoming Coursework",
      description:
        "Applying geological principles to subsurface fluid dynamics, energy exploration, spatial mapping, and mining operations.",
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
      category: "Geological Field & Laboratory Competencies",
      items: [
        {
          name: "Strike & Dip Measurement (Brunton Compass)",
          level: "Core Foundation",
          note: "Regularly practiced during departmental field mapping and strike/dip exercises.",
        },
        {
          name: "Hand-Specimen Mineral & Rock Identification",
          level: "Core Foundation",
          note: "Trained on physical diagnostic properties: hardness, streak, cleavage, and luster.",
        },
        {
          name: "Stratigraphic Column & Litholog Preparation",
          level: "Proficient",
          note: "Prepared sedimentary lithologs recording grain size, bedding, and sedimentary structures.",
        },
        {
          name: "Geological Field Mapping & Traverse Recording",
          level: "Core Foundation",
          note: "Field excursion documentation, outcrop observation, and spatial traverse recording.",
        },
        {
          name: "Petrographic Microscope Inspection",
          level: "Developing",
          note: "Examining thin-sections under plane-polarized and cross-polarized light.",
        },
        {
          name: "GIS & Remote Sensing Spatial Analysis",
          level: "Developing",
          note: "Active study of satellite imagery band combinations and digital elevation models.",
        },
      ],
    },
    {
      category: "Computational & Software Engineering",
      items: [
        {
          name: "Next.js 16 & React 19 (App Router)",
          level: "Proficient",
          note: "Primary stack used in building GeoMine Resource Hub and personal academic platforms.",
        },
        {
          name: "TypeScript & Modern JavaScript",
          level: "Proficient",
          note: "Strong typing, interfaces, and strict type safety across full-stack applications.",
        },
        {
          name: "Tailwind CSS & Accessible UI Systems",
          level: "Proficient",
          note: "Building editorial, responsive, WCAG-compliant design systems with high contrast.",
        },
        {
          name: "Prisma ORM & SQL Database Modeling",
          level: "Proficient",
          note: "Relational database schema normalization, indexing, and migration pipelines.",
        },
        {
          name: "Git Version Control & GitHub Workflows",
          level: "Core Foundation",
          note: "Branching, atomic commits, pull requests, and open-source project maintenance.",
        },
        {
          name: "Python for Geoscience Data Handling",
          level: "Developing",
          note: "Learning data manipulation libraries (NumPy, Pandas) for geological datasets.",
        },
      ],
    },
    {
      category: "Academic & Communication Competencies",
      items: [
        {
          name: "Academic Curriculum Organization",
          level: "Core Foundation",
          note: "Proven by structuring the 8-semester Geology & Mining syllabus into GeoMine Hub.",
        },
        {
          name: "Technical Documentation & Markdown",
          level: "Core Foundation",
          note: "Authoring comprehensive READMEs, schema documentation, and technical case studies.",
        },
        {
          name: "Scientific Literature Review",
          level: "Proficient",
          note: "Reading and summarizing peer-reviewed papers in hydrogeology and basin geology.",
        },
        {
          name: "Peer Seminar & Academic Presentations",
          level: "Proficient",
          note: "Delivering clear departmental seminar presentations on earth-science topics.",
        },
      ],
    },
  ],

  futureGoals: [
    {
      timeframe: "Near-Term",
      stage: "Undergraduate Completion",
      title: "Undergraduate Completion & Field Capstone",
      description:
        "Complete upper-level coursework in hydrogeology, petroleum systems, and mining geology while conducting departmental field mapping.",
      keyDeliverables: [
        "Complete geological mapping report with cross-sections.",
        "Maintain strong academic standing for graduate admissions.",
        "Finalize documentation and open-source release of GeoMine Resource Hub.",
      ],
    },
    {
      timeframe: "Medium-Term",
      stage: "MSc Scholarship Applications",
      title: "Graduate Admissions & MSc Scholarships",
      description:
        "Apply for international MSc scholarship programs in Earth Sciences and Hydrogeology with dedicated subsurface research groups.",
      keyDeliverables: [
        "Develop a focused research proposal in basin hydrogeology.",
        "Connect with prospective graduate research supervisors.",
        "Complete graduate admissions requirements (IELTS/GRE).",
      ],
    },
    {
      timeframe: "Long-Term",
      stage: "Scientific Research Career",
      title: "Scientific Research & Academic Contribution",
      description:
        "Contribute to international research on groundwater sustainability, sedimentary basin dynamics, and computational geoscience tools.",
      keyDeliverables: [
        "Publish findings in peer-reviewed geological and hydrological journals.",
        "Develop open-access software tools for geoscience education.",
      ],
    },
  ],
};
