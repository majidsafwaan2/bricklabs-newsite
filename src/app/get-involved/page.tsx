import type { Metadata } from "next";
import { SchoolRequestForm, VolunteerInquiryForm } from "@/components/InquiryForms";
import { ButtonLink } from "@/components/ButtonLink";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { TrustDisclaimer } from "@/components/TrustDisclaimer";

export const metadata: Metadata = {
  title: "Request Building Materials - BricklabClips",
  description:
    "Teachers, coaches, clubs, and teams can request building materials from BricklabClips."
};

export default function GetInvolvedPage() {
  return (
    <>
      <Hero
        eyebrow="Get involved"
        title="Request building materials."
        description="Tell us what your classroom, club, or team needs. We'll review the request and reach out for a quick call."
        actions={[
          { label: "Request Materials", href: "#school-request", variant: "dark" },
          { label: "Partner With Us", href: "/sponsor#sponsor-inquiry", variant: "secondary" }
        ]}
      />

      <section className="section section-tight">
        <div className="container">
          <div className="card-grid four">
            <article className="action-card">
              <h3>Schools</h3>
              <p>Request parts for a classroom, club, library, or team.</p>
              <ButtonLink href="#school-request" variant="dark">
                Request materials
              </ButtonLink>
            </article>
            <article className="action-card">
              <h3>Sponsors</h3>
              <p>Fund useful parts, shipping, tools, or challenge prizes.</p>
              <ButtonLink href="/sponsor#sponsor-inquiry" variant="dark">
                Partner with us
              </ButtonLink>
            </article>
            <article className="action-card">
              <h3>Builders</h3>
              <p>Join the Build Challenge using safe materials you have.</p>
              <ButtonLink href="/hackathon" variant="dark">
                Join the challenge
              </ButtonLink>
            </article>
            <article className="action-card">
              <h3>Mentors/Judges</h3>
              <p>Review projects and encourage student builders.</p>
              <ButtonLink href="#mentor-judge" variant="dark">
                Help review projects
              </ButtonLink>
            </article>
          </div>
        </div>
      </section>

      <section id="school-request" className="section section-white">
        <div className="container two-column align-start">
          <div>
            <SectionHeader eyebrow="School materials request" title="What do you need?">
              Tell us the parts, tools, or supplies that would help students build. Approved requests are purchased and shipped directly.
            </SectionHeader>
          </div>
          <div className="form-panel">
            <SchoolRequestForm />
          </div>
        </div>
      </section>

      <section id="mentor-judge" className="section">
        <div className="container two-column align-start">
          <div>
            <SectionHeader eyebrow="Mentors and judges" title="Help students explain, improve, and share their builds.">
              Teachers, engineers, robotics mentors, and makers can help review projects or suggest accessible build ideas.
            </SectionHeader>
          </div>
          <div className="form-panel">
            <VolunteerInquiryForm />
          </div>
        </div>
      </section>

      <section className="section section-white section-compact">
        <div className="container narrow">
          <TrustDisclaimer />
        </div>
      </section>
    </>
  );
}
