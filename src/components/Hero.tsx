import type { ReactNode } from "react";
import { ButtonLink } from "./ButtonLink";

type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "dark" | "ghost";
};

type HeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: HeroAction[];
  children?: ReactNode;
  visual?: "home" | "simple";
  newsFeature?: {
    videoSrc: string;
    posterSrc: string;
    audienceValue: string;
    audienceLabel: string;
    description: string;
  };
};

export function Hero({
  eyebrow,
  title,
  description,
  actions = [],
  children,
  visual = "simple",
  newsFeature
}: HeroProps) {
  return (
    <section className={visual === "home" ? "hero hero-home" : "hero hero-simple"}>
      {visual === "home" && newsFeature ? <HeroNewsFeature feature={newsFeature} /> : null}
      <div className="container hero-content">
        <div className="hero-copy">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1>{title}</h1>
          {description ? <p className="hero-description">{description}</p> : null}
          {actions.length > 0 ? (
            <div className="hero-actions">
              {actions.map((action) => (
                <ButtonLink key={action.href + action.label} href={action.href} variant={action.variant}>
                  {action.label}
                </ButtonLink>
              ))}
            </div>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function HeroNewsFeature({ feature }: { feature: NonNullable<HeroProps["newsFeature"]> }) {
  return (
    <div className="hero-illustration hero-news-feature">
      <div className="hero-news-video-wrap">
        <video
          className="hero-news-video"
          src={feature.videoSrc}
          poster={feature.posterSrc}
          aria-label="Safwaan Majid discussing BrickLabClips live on FOX 5 DC"
          aria-describedby="hero-news-description"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
        />
      </div>
      <div className="hero-news-caption" id="hero-news-description">
        <p className="hero-news-audience">
          <strong>{feature.audienceValue}</strong>
          <span>{feature.audienceLabel}</span>
        </p>
        <p>{feature.description}</p>
      </div>
    </div>
  );
}
