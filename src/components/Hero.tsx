import type { ReactNode } from "react";
import Image from "next/image";
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
};

export function Hero({ eyebrow, title, description, actions = [], children, visual = "simple" }: HeroProps) {
  return (
    <section className={visual === "home" ? "hero hero-home" : "hero hero-simple"}>
      {visual === "home" ? <HeroIllustration /> : null}
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

function HeroIllustration() {
  return (
    <div className="hero-illustration" role="img" aria-label="Students building with BrickLabs materials">
      <Image
        src="/images/students-building.png"
        alt="Students building with hands-on materials at a BrickLabs activity."
        width={1448}
        height={1086}
        priority
      />
    </div>
  );
}
