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
          <a
            className="hero-social-link"
            href={siteContent.brand.tiktokUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit BrickLabClips on TikTok"
          >
            <TikTokIcon />
            <span>@bricklabclips</span>
          </a>
        </div>
      </Hero>

      <SourceBackedProblemSection />

      <section className="section section-dark">
        <div className="container">
          <SectionHeader eyebrow="How BricklabClips helps" title="Reach now. Materials next.">
            BricklabClips already reaches millions of people each month. This dashboard shows what has been raised, purchased,
            and shipped for schools so far.
          </SectionHeader>
          <ImpactDashboard metrics={homeMetrics} />
          <p className="small-note">School support numbers update as materials are raised, purchased, and delivered.</p>
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
          <p>Explore a guide, request materials for a school, or help fund the next classroom build.</p>
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

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M15.6 3.2c.35 2.13 1.55 3.45 3.62 3.84v3.08a7.2 7.2 0 0 1-3.58-.98v5.78c0 3.04-2.05 5.04-5.05 5.04-2.77 0-4.93-1.94-4.93-4.54 0-2.86 2.36-4.87 5.4-4.47v3.16c-1.1-.34-2.14.24-2.14 1.3 0 .89.75 1.48 1.65 1.48 1.04 0 1.72-.66 1.72-1.88V3.2h3.31Z"
        fill="currentColor"
      />
    </svg>
  );
}
