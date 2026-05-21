"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const advocacyDeckUrl = "/docs/founder-stem-advocacy.pdf";
const deckSlides = Array.from({ length: 8 }, (_, index) => `/docs/founder-deck/page-${index + 1}.png`);

export function FounderBackground() {
  const [isOpen, setIsOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <section className="section">
      <div className="container founder-layout">
        <div className="founder-photo-placeholder" aria-label="Founder photo placeholder">
          <span>Founder photo</span>
        </div>
        <div className="founder-copy">
          <p className="eyebrow">Founder background</p>
          <h2>Meet Safwaan.</h2>
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
          <button
            className="button button-dark"
            type="button"
            onClick={() => {
              setSlideIndex(0);
              setIsOpen(true);
            }}
          >
            Learn more
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setIsOpen(false)}>
          <div
            className="deck-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Founder STEM advocacy slideshow"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="deck-modal-header">
              <div>
                <p className="eyebrow">Advocacy deck</p>
                <h3>STEM education in Loudoun County</h3>
              </div>
              <button className="icon-button" type="button" aria-label="Close slideshow" onClick={() => setIsOpen(false)}>
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <div className="deck-slide-frame">
              <Image
                src={deckSlides[slideIndex]}
                alt={`Founder STEM advocacy slideshow page ${slideIndex + 1}`}
                width={1152}
                height={648}
                priority
              />
            </div>
            <div className="deck-modal-actions">
              <button
                className="button button-secondary"
                type="button"
                onClick={() => setSlideIndex((current) => Math.max(0, current - 1))}
                disabled={slideIndex === 0}
              >
                Previous
              </button>
              <span>
                {slideIndex + 1} / {deckSlides.length}
              </span>
              <button
                className="button button-secondary"
                type="button"
                onClick={() => setSlideIndex((current) => Math.min(deckSlides.length - 1, current + 1))}
                disabled={slideIndex === deckSlides.length - 1}
              >
                Next
              </button>
              <a className="button button-dark" href={advocacyDeckUrl} target="_blank" rel="noreferrer">
                Open PDF
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
