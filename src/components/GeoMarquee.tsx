/**
 * GeoMarquee — Geological thematic typography marquee.
 *
 * A seamless, horizontally scrolling band of editorial geological terms
 * placed between the Hero and About sections. Pure CSS animation,
 * no JavaScript state or motion libraries required.
 *
 * Accessibility:
 *   - aria-hidden="true" on duplicate tracks (screen readers see only one pass)
 *   - aria-label on the container for meaningful context
 *   - prefers-reduced-motion: shows a static centered layout
 *   - hover pauses animation
 */

const TERMS = [
  { text: "GEOSCIENCE", outlined: false },
  { text: "·", outlined: false, isSep: true },
  { text: "EARTH SYSTEMS", outlined: true },
  { text: "·", outlined: false, isSep: true },
  { text: "FULL-STACK DEVELOPMENT", outlined: false },
  { text: "·", outlined: false, isSep: true },
  { text: "HYDROGEOLOGY", outlined: true },
  { text: "·", outlined: false, isSep: true },
  { text: "MINERAL RESOURCES", outlined: false },
  { text: "·", outlined: false, isSep: true },
  { text: "PRACTICAL DIGITAL TOOLS", outlined: true },
  { text: "·", outlined: false, isSep: true },
];

interface Term {
  text: string;
  outlined: boolean;
  isSep?: boolean;
}

function TermItem({ term }: { term: Term }) {
  if (term.isSep) {
    return (
      <span
        className="mx-6 sm:mx-8 lg:mx-10 text-[#D4AF37]/40 text-[10px] sm:text-xs select-none"
        aria-hidden="true"
      >
        ◆
      </span>
    );
  }

  if (term.outlined) {
    return (
      <span className="geo-marquee-outlined shrink-0 select-none">
        {term.text}
      </span>
    );
  }

  return (
    <span className="geo-marquee-solid shrink-0 select-none">
      {term.text}
    </span>
  );
}

export function GeoMarquee() {
  return (
    <section
      aria-label="Geological research themes"
      className="geo-marquee-section relative w-full overflow-hidden bg-[#000000] border-t border-b border-white/[0.06] py-5 sm:py-6"
    >
      {/* Fade masks — pure CSS, no JS needed */}
      <div
        className="absolute inset-y-0 left-0 w-16 sm:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #000000 0%, transparent 100%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-16 sm:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #000000 0%, transparent 100%)" }}
        aria-hidden="true"
      />

      {/*
        Accessible single-pass content for screen readers.
        The visual scrolling uses aria-hidden duplicates below.
      */}
      <p className="sr-only">
        Geological research themes: Geology, Earth Systems, Mineral Resources, Hydrogeology, GIS & Remote Sensing, Field to Data
      </p>

      {/*
        Two identical tracks stacked horizontally inside a flex row.
        CSS animation translates the pair from 0% → -50% so the
        second copy seamlessly takes over exactly where the first ends.
      */}
      <div
        className="geo-marquee-track flex items-center whitespace-nowrap"
        aria-hidden="true"
      >
        {/* Track 1 — primary */}
        <span className="geo-marquee-inner flex items-center">
          {TERMS.map((term, i) => (
            <TermItem key={`t1-${i}`} term={term} />
          ))}
        </span>
        {/* Track 2 — seamless duplicate */}
        <span className="geo-marquee-inner flex items-center" aria-hidden="true">
          {TERMS.map((term, i) => (
            <TermItem key={`t2-${i}`} term={term} />
          ))}
        </span>
      </div>
    </section>
  );
}
