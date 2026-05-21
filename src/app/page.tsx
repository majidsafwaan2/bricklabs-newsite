import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { FounderBackground } from "@/components/FounderBackground";
import { Hero } from "@/components/Hero";
import { ImpactDashboard } from "@/components/ImpactDashboard";
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
  const homeMetrics = [...siteContent.audienceStats, ...siteContent.impactStats.slice(0, 4)];

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

      <SourceBackedProblemSection />

      <section className="section section-dark">
        <div className="container">
          <SectionHeader eyebrow="How BricklabClips helps" title="Attention can become materials.">
            The audience is already here. The school-materials side is launching with honest metrics that update as requests are funded.
          </SectionHeader>
          <ImpactDashboard metrics={homeMetrics} />
          <p className="small-note">School support metrics start at zero and update only after approved materials are funded and shipped.</p>
        </div>
      </section>

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

      <FounderBackground />

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
