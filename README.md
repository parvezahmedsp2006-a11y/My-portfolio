# Parvez Ahmed — Academic & Research Portfolio

A premium, modern, accessible personal portfolio website for **Parvez Ahmed**, an undergraduate Geology & Mining student at the **University of Rajshahi** and aspiring researcher in earth sciences and computational geology.

Designed with an academic-first, editorial aesthetic (warm ivory palette, charcoal typography, muted sage-green accents, and elegant serif headings) tailored for prospective MSc scholarship applications, graduate school reviews, and open scientific collaborations.

---

## 🌟 Key Features & Sections

1. **Responsive Navigation**: Accessible brand mark, section anchor links, and mobile drawer with keyboard navigation support.
2. **Hero Section**:
   - Headline: *"Exploring the Earth. Understanding Our Resources."*
   - Academic identity, department and university affiliations.
   - Restrained geological contour SVG lines.
3. **About Me**: Narrative of academic background, field motivations, and graduate research trajectory.
4. **Academic Journey**: 4-year B.Sc. (Hons.) curriculum breakdown with verified distinction between completed coursework and upcoming studies.
5. **Research Interests**:
   - *Hydrogeology*
   - *Mineral Resources*
   - *Petroleum Geology*
   - *GIS & Remote Sensing*
   - Concrete target inquiry questions formulated for graduate research.
6. **Technical Projects: GeoMine Resource Hub**:
   - Comprehensive case study of the departmental academic resource platform demonstrating full-stack engineering, architecture, and database modeling.
   - Categorized as *Full-Stack Web Application · Educational Technology*.
   - Highlights verified contributions: full-stack architecture, course & semester navigation, in-browser PDF viewing, admin-scoped upload workflows, and 22 automated test suites.
   - Verified open-source GitHub repository link.
   - Honest deployment transparency (active local MVP, 22 test suites, pending institutional deployment).
7. **Skills & Learning**: Categorized geological field competencies, software engineering proficiencies, and scientific communication skills.
8. **Academic Development & Future Goals**: Structured roadmap spanning undergraduate completion, MSc scholarship applications, and long-term research career.
9. **Contact & Footer**: Direct academic email (`parvezahmed.sp2006@gmail.com`), one-click email copy button with status feedback, and GitHub profile links.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: Purposeful CSS keyframe transitions & `IntersectionObserver` scroll reveals respecting `prefers-reduced-motion`

---

## 📝 How to Update Portfolio Content (Beginner-Friendly)

All content, contact details, projects, coursework, and skills are stored in a single source of truth:
```
src/data/portfolioData.ts
```
To update any information:
1. Open [`src/data/portfolioData.ts`](src/data/portfolioData.ts).
2. Edit any field (e.g. personal bio, new projects, coursework grades, or contact links).
3. The UI will automatically update across all components without needing to touch any JSX or CSS code.

---

## 🚀 Local Development & Build

### Development Server
```bash
npm run dev
# Starts Next.js development server at http://localhost:3000
```

### Type Checking & Linting
```bash
npm run lint
npx tsc --noEmit
```

### Production Build
```bash
npm run build
npm run start
```
