"use client";

import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const advocacyDeckUrl = "/docs/founder-stem-advocacy.pdf";
const deckSlides = Array.from({ length: 8 }, (_, index) => `/docs/founder-deck/page-${index + 1}.png`);

export function FounderBackground({ standalone = false }: { standalone?: boolean }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const Heading = standalone ? "h1" : "h2";

  return (
    <section id="about" className="section section-white" aria-labelledby="about-heading">
      <div className="container founder-layout">
        <div className="founder-photo">
          <Image
            src="/images/founder-safwaan.png"
            alt="Safwaan, founder of BrickLabClips."
            width={818}
            height={856}
          />
        </div>
        <div className="founder-copy">
          <p className="eyebrow">Founder background</p>
          <Heading id="about-heading">About Us</Heading>
          <p>
            Safwaan created BricklabClips after seven years in competitive robotics through VEX, where building, competing,
            and mentoring made hands-on STEM feel real. Through that work, he saw how much access to parts, practice space,
            and support can shape what students are able to build.
          </p>
          <p>
            His advocacy work focused on supporting public school robotics teams with unequal access to materials and
            opportunities. In 2024, Safwaan received the VEX Robotics International STEM Advocacy Award for that work.
            BricklabClips builds on the same belief: students should have the chance to make things themselves, not just
            watch other people build online.
          </p>
        </div>
      </div>

      <div className="container founder-deck" aria-label="Founder STEM advocacy slideshow">
        <div className="founder-deck-header">
          <div>
            <p className="eyebrow">Advocacy in action</p>
            <h3>Supporting public school robotics in Loudoun County</h3>
          </div>
          <a className="button button-secondary founder-deck-pdf" href={advocacyDeckUrl} target="_blank" rel="noreferrer">
            Open PDF
            <ExternalLink size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="deck-slide-frame" aria-live="polite">
          <Image
            src={deckSlides[slideIndex]}
            alt={`Founder STEM advocacy slideshow page ${slideIndex + 1} of ${deckSlides.length}`}
            width={1152}
            height={648}
            priority={slideIndex === 0}
          />
        </div>
        <div className="founder-deck-actions">
          <button
            className="button button-secondary"
            type="button"
            onClick={() => setSlideIndex((current) => Math.max(0, current - 1))}
            disabled={slideIndex === 0}
          >
            <ChevronLeft size={18} aria-hidden="true" />
            Previous
          </button>
          <span aria-label={`Slide ${slideIndex + 1} of ${deckSlides.length}`}>
            {slideIndex + 1} / {deckSlides.length}
          </span>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => setSlideIndex((current) => Math.min(deckSlides.length - 1, current + 1))}
            disabled={slideIndex === deckSlides.length - 1}
          >
            Next
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
