import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Hero } from "@/components/Hero";
import { ImpactLoopGraphic } from "@/components/ImpactLoopGraphic";
import { ProgramCards } from "@/components/ProgramCards";
import { SectionHeader } from "@/components/SectionHeader";
import { SourceBackedProblemSection } from "@/components/SourceBackedProblemSection";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "BricklabClips - Build What You Imagine",
  description: "Build what you imagine with BricklabClips."
};

export default function HomePage() {
  const featuredGuides = siteContent.library.guides.slice(0, 3);

  return (
    <>
      <Hero
        eyebrow="Watch it. Build it. Share it."
        title="Build what you imagine."
        visual="home"
        actions={[
          { label: "Explore Builds", href: "/library", variant: "dark" },
          { label: "Request Materials", href: "/get-involved#school-request", variant: "secondary" },
          { label: "Partner With Us", href: "/sponsor#sponsor-inquiry", variant: "ghost" }
        ]}
      >
        <div className="hero-stat-row" aria-label="BricklabClips audience stats">
          {siteContent.audienceStats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </Hero>

      <section className="section section-yellow section-tight">
        <div className="container">
          <SectionHeader centered eyebrow="How it works" title="A simple build loop.">
            {siteContent.loopSummary}
          </SectionHeader>
          <ImpactLoopGraphic />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Explore" title="Pick a path and start building.">
            Guides, challenges, and material requests are designed for classrooms, clubs, and curious builders.
          </SectionHeader>
          <ProgramCards programs={siteContent.programs} />
        </div>
      </section>

      <SourceBackedProblemSection />

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Featured guides" title="Ideas you can actually build.">
            Starter guides are templates until the full BricklabClips demos are linked.
          </SectionHeader>
          <div className="featured-guide-grid">
            {featuredGuides.map((guide) => (
              <article className="featured-guide-card" key={guide.title}>
                <span>{guide.difficulty}</span>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <ButtonLink href="/library" variant="dark">
                  View guide
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container preview-grid">
          <article className="preview-panel challenge-preview">
            <p className="eyebrow">Build Challenge</p>
            <h2>Build with what you have.</h2>
            <p>Submit cardboard, code, brick-compatible, electronics, recycled, or classroom builds.</p>
            <ButtonLink href="/hackathon" variant="dark">
              See challenge
            </ButtonLink>
          </article>
          <article className="preview-panel materials-preview">
            <p className="eyebrow">For schools</p>
            <h2>Need parts?</h2>
            <p>Teachers and coaches can request robotics and engineering materials for classrooms, clubs, or teams.</p>
            <ButtonLink href="/get-involved#school-request" variant="dark">
              Request materials
            </ButtonLink>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container two-column align-center">
          <div>
            <p className="eyebrow">Founder background</p>
            <h2>Built from advocacy experience.</h2>
          </div>
          <div className="founder-card">
            <p>
              BricklabClips builds on previous STEM advocacy work in Loudoun County through VEX Robotics, including support for
              public school robotics teams and advocacy for more hands-on learning opportunities.
            </p>
            <details>
              <summary>More background</summary>
              <p>
                Previous advocacy work included helping public school teams practice, speaking about robotics funding, and receiving
                local school board recognition.
              </p>
            </details>
            {siteContent.brand.founderAwardEnabled ? <p className="award-line">{siteContent.brand.founderAwardLine}</p> : null}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container final-cta">
          <h2>Ready to build?</h2>
          <p>Explore a guide, request materials for a school, or help fund the next classroom box.</p>
          <div className="hero-actions">
            <ButtonLink href="/library" variant="dark">
              Explore Builds
            </ButtonLink>
            <ButtonLink href="/get-involved#school-request" variant="secondary">
              Request Materials
            </ButtonLink>
            <ButtonLink href="/sponsor#sponsor-inquiry" variant="ghost">
              Partner With Us
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
