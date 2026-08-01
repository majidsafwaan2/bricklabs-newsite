import type { Metadata } from "next";
import Image from "next/image";
import { ButtonAnchor } from "@/components/ButtonLink";
import { SectionHeader } from "@/components/SectionHeader";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Sponsor Student STEM Programs - BrickLabClips",
  description:
    "Partner with BrickLabClips to support robotics, engineering, and creative building materials for Virginia schools."
};

const sponsor = siteContent.sponsor;

function emailLink(subject: string) {
  return `mailto:${sponsor.email}?subject=${encodeURIComponent(subject)}`;
}

export default function SponsorPage() {
  return (
    <div className="sponsor-page">
      <section className="section section-white sponsor-opening">
        <div className="container sponsor-opening-grid">
          <div className="sponsor-opening-copy">
            <p className="eyebrow">Sponsor student building</p>
            <h1>Help Students Build.</h1>
            <p className="sponsor-opening-lead">
              Partner with BrickLabClips to help Virginia schools access robotics, engineering, and creative building
              materials.
            </p>
            <p>
              BrickLabClips turns the reach of educational engineering content into direct support for school STEM
              programs. Sponsorships help provide equipment, materials, and hands-on opportunities for students.
            </p>
            <div className="sponsor-opening-actions">
              <ButtonAnchor href="#sponsorship-options" variant="dark">
                View Sponsorship Options
              </ButtonAnchor>
              <ButtonAnchor href="#sponsor-inquiry" variant="secondary">
                Ask a Question
              </ButtonAnchor>
            </div>
          </div>
          <figure className="sponsor-opening-image">
            <Image
              src="/images/students-building.png"
              alt="A student using BrickLabs building materials during a hands-on STEM activity."
              width={1448}
              height={1086}
              sizes="(max-width: 900px) 100vw, 52vw"
              priority
            />
            <figcaption className="sponsor-image-disclosure">This is a mock AI-generated image</figcaption>
          </figure>
        </div>
      </section>

      <section className="section sponsor-impact">
        <div className="container">
          <SectionHeader eyebrow="Impact and current focus" title="Reach that supports student building.">
            BrickLabClips connects a large engineering audience with practical support for school STEM programs.
          </SectionHeader>
          <dl className="sponsor-impact-grid">
            {sponsor.impactStats.map((stat) => (
              <div className="sponsor-impact-card" key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
          <div className="sponsor-focus">
            <div>
              <h3>Schools Currently in Focus</h3>
              <ul>
                {sponsor.schoolsInFocus.map((school) => (
                  <li key={school}>{school}</li>
                ))}
              </ul>
            </div>
            <p className="sponsor-funds-statement">{sponsor.fundsStatement}</p>
          </div>
        </div>
      </section>

      <section className="section section-yellow sponsor-options" id="sponsorship-options">
        <div className="container">
          <SectionHeader centered eyebrow="Sponsorship options" title="Choose a level of support.">
            Each option connects sponsor recognition with direct support for student engineering programs.
          </SectionHeader>
          <div className="sponsor-tier-grid">
            {sponsor.tiers.map((tier) => (
              <article
                className={`sponsor-tier${"recommended" in tier ? " sponsor-tier-recommended" : ""}`}
                key={tier.name}
              >
                {"recommended" in tier ? <span className="sponsor-tier-badge">Recommended</span> : null}
                <h3>{tier.name}</h3>
                <p className="sponsor-tier-price">{tier.price}</p>
                <p className="sponsor-tier-description">{tier.description}</p>
                <ul>
                  {tier.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
                <ButtonAnchor
                  href={emailLink(tier.emailSubject)}
                  variant={"recommended" in tier ? "dark" : "secondary"}
                >
                  {tier.buttonLabel}
                </ButtonAnchor>
              </article>
            ))}
          </div>
          <div className="sponsor-custom">
            <p>{sponsor.customSupport}</p>
            <ButtonAnchor href={emailLink("BrickLabClips Custom Sponsorship Inquiry")} variant="ghost">
              Discuss a Custom Sponsorship
            </ButtonAnchor>
          </div>
        </div>
      </section>

      <section className="section section-white sponsor-details">
        <div className="container">
          <SectionHeader eyebrow="Clear expectations" title="Important Sponsorship Details">
            A few practical details make every partnership easier to understand.
          </SectionHeader>
          <div className="sponsor-detail-list">
            {sponsor.details.map((detail, index) => (
              <details key={detail.title} open={index === 0}>
                <summary>{detail.title}</summary>
                <p>{detail.body}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark sponsor-contact" id="sponsor-inquiry">
        <div className="container">
          <p className="eyebrow">Start a conversation</p>
          <h2>Interested in Supporting Student STEM Programs?</h2>
          <p>
            If you have questions, would like to select a sponsorship tier, or want to discuss a custom contribution,
            please contact BrickLabClips. I would also be happy to join a brief call later this week if that would be
            helpful.
          </p>
          <a className="sponsor-email" href={`mailto:${sponsor.email}`}>
            {sponsor.email}
          </a>
          <div className="sponsor-contact-actions">
            <ButtonAnchor href={emailLink("BrickLabClips Sponsorship Inquiry")} variant="primary">
              Email BrickLabClips
            </ButtonAnchor>
          </div>
        </div>
      </section>
    </div>
  );
}
