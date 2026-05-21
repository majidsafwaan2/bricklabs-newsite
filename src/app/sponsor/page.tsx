import type { Metadata } from "next";
import { SponsorInquiryForm } from "@/components/InquiryForms";
import { Hero } from "@/components/Hero";
import { ImpactLoopGraphic } from "@/components/ImpactLoopGraphic";
import { SectionHeader } from "@/components/SectionHeader";
import { TrustDisclaimer } from "@/components/TrustDisclaimer";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Help Students Build - BricklabClips",
  description:
    "Partner with BricklabClips to fund robotics, engineering, and creative building materials for schools."
};

export default function SponsorPage() {
  return (
    <>
      <Hero
        eyebrow="Sponsor"
        title="Help students build."
        description="Partner with BricklabClips to fund robotics, engineering, and creative building materials for schools."
        actions={[{ label: "Contact BricklabClips", href: "#sponsor-inquiry", variant: "dark" }]}
      />

      <section className="section section-yellow">
        <div className="container">
          <SectionHeader centered eyebrow="Simple model" title="From videos to classroom parts.">
            {siteContent.loopSummary}
          </SectionHeader>
          <ImpactLoopGraphic compact />
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <SectionHeader eyebrow="Support can fund" title="Useful materials, shipped to schools." />
          <div className="mini-card-grid">
            {siteContent.sponsor.fundingUses.map((item) => (
              <article className="mini-card" key={item}>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column align-start">
          <div>
            <SectionHeader eyebrow="Sponsors receive" title="Clear scope before launch." />
            <ul className="check-list">
              {siteContent.sponsor.sponsorReceives.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div id="sponsor-inquiry" className="form-panel">
            <p>Send a quick note. We&apos;ll schedule a call and agree on scope before launch.</p>
            <SponsorInquiryForm />
          </div>
        </div>
      </section>

      <section className="section section-white section-compact">
        <div className="container narrow">
          <p className="small-note">
            Sponsored content will be clearly disclosed according to applicable platform and advertising guidance.
          </p>
          <TrustDisclaimer />
        </div>
      </section>
    </>
  );
}
