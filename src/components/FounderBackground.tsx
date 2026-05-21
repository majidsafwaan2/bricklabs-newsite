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
      <div className="container two-column align-center">
        <div>
          <p className="eyebrow">Founder background</p>
          <h2>Built from robotics advocacy.</h2>
        </div>
        <div className="founder-card">
          <ul className="check-list">
            <li>Participated in competitive robotics through VEX for the past seven years.</li>
            <li>Worked on community advocacy to support public school robotics teams with unequal access to parts.</li>
            <li>Won the 2024 VEX Robotics International STEM Advocacy Award for this work.</li>
          </ul>
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
