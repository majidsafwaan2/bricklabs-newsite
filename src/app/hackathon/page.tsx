import type { Metadata } from "next";
import { ButtonAnchor } from "@/components/ButtonLink";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Bricklab Build Challenge - Build With What You Have",
  description:
    "The Bricklab Build Challenge invites students to submit safe creative engineering projects made from accessible materials."
};

export default function HackathonPage() {
  return (
    <>
      <Hero
        eyebrow="Bricklab Build Challenge"
        title="Build with what you have."
        description="Submit a safe creative engineering project made from the materials around you."
        actions={[{ label: "Request starter materials", href: "/get-involved#school-request", variant: "dark" }]}
      />

      <section className="section section-tight">
        <div className="container challenge-grid">
          <article className="feature-panel">
            <h2>Overview</h2>
            <p>Make, test, explain, and improve an engineering idea using materials you can access.</p>
          </article>
          <article className="feature-panel">
            <h2>Who can join</h2>
            <p>Students, classrooms, clubs, libraries, and teams are welcome.</p>
          </article>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <SectionHeader eyebrow="Tracks" title="Choose the build path that fits your materials." />
          <div className="track-grid">
            {siteContent.challenge.tracks.map((track) => (
              <article className="track-card" key={track}>
                <span aria-hidden="true" />
                <h3>{track}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-yellow">
        <div className="container">
          <SectionHeader eyebrow="Details" title="Simple rules, clear judging." />
          <div className="faq-list">
            <details open>
              <summary>Submission requirements</summary>
              <ul className="compact-list">
                {siteContent.challenge.requirements.map((requirement) => (
                  <li key={requirement}>{requirement}</li>
                ))}
              </ul>
            </details>
            <details>
              <summary>Judging rubric</summary>
              <div className="rubric-list compact">
                {siteContent.challenge.rubric.map((item) => (
                  <div key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </details>
            <details>
              <summary>Eligibility and privacy</summary>
              <p>
                Students under 13 should submit through a parent, guardian, teacher, or approved adult. Public student names are not
                required.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container two-column align-start">
          <article className="feature-panel">
            <h2>Access support</h2>
            <p>Students, teachers, and clubs with limited parts can request starter materials.</p>
          </article>
          <article className="feature-panel">
            <h2>Devpost</h2>
            <p>{siteContent.challenge.devpostUrl ? "The Devpost page is ready for submissions." : "Devpost page coming soon."}</p>
            {siteContent.challenge.devpostUrl ? (
              <ButtonAnchor href={siteContent.challenge.devpostUrl} target="_blank" rel="noreferrer" variant="dark">
                Open Devpost
              </ButtonAnchor>
            ) : null}
          </article>
        </div>
      </section>

      <section className="section section-white section-compact">
        <div className="container">
          <SectionHeader eyebrow="FAQ" title="Common questions." />
          <div className="faq-list">
            {siteContent.challenge.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
