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
    <svg className="hero-illustration" viewBox="0 0 900 520" aria-hidden="true">
      <defs>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="#000000" floodOpacity="0.18" />
        </filter>
      </defs>
      <path d="M52 419C132 334 230 330 339 366C455 404 522 374 624 309C718 249 794 264 865 338V520H52V419Z" fill="#FFFFFF" opacity="0.72" />
      <g filter="url(#softShadow)">
        <rect x="493" y="132" width="184" height="126" rx="14" fill="#111111" />
        <rect x="512" y="152" width="47" height="33" rx="7" fill="#FFD433" />
        <rect x="574" y="152" width="47" height="33" rx="7" fill="#FFFFFF" />
        <rect x="636" y="152" width="22" height="87" rx="7" fill="#2F80ED" />
        <path d="M526 218H619" stroke="#FFD433" strokeWidth="11" strokeLinecap="round" />
      </g>
      <g filter="url(#softShadow)">
        <rect x="654" y="277" width="127" height="96" rx="12" fill="#FF5B45" />
        <rect x="679" y="253" width="30" height="30" rx="8" fill="#FFFFFF" stroke="#111111" strokeWidth="5" />
        <rect x="728" y="253" width="30" height="30" rx="8" fill="#FFFFFF" stroke="#111111" strokeWidth="5" />
        <path d="M681 332H755" stroke="#111111" strokeWidth="12" strokeLinecap="round" />
      </g>
      <g filter="url(#softShadow)">
        <path d="M310 296H425L454 386H280L310 296Z" fill="#FFFFFF" stroke="#111111" strokeWidth="8" />
        <path d="M330 316H399" stroke="#2F80ED" strokeWidth="9" strokeLinecap="round" />
        <path d="M321 348H430" stroke="#22A35A" strokeWidth="9" strokeLinecap="round" />
        <path d="M310 382H448" stroke="#FFD433" strokeWidth="9" strokeLinecap="round" />
      </g>
      <g transform="translate(162 151)" filter="url(#softShadow)">
        <circle cx="81" cy="81" r="53" fill="#FFD433" stroke="#111111" strokeWidth="10" />
        <circle cx="81" cy="81" r="17" fill="#FFFFFF" stroke="#111111" strokeWidth="8" />
        <path d="M81 0V29M81 133V162M0 81H29M133 81H162M24 24L45 45M117 117L138 138M138 24L117 45M45 117L24 138" stroke="#111111" strokeWidth="12" strokeLinecap="round" />
      </g>
      <path d="M452 173C391 142 333 146 283 186" stroke="#111111" strokeWidth="10" strokeLinecap="round" strokeDasharray="1 23" />
      <path d="M458 186L486 177L468 153" stroke="#111111" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M567 294C523 338 505 385 526 435" stroke="#111111" strokeWidth="10" strokeLinecap="round" strokeDasharray="1 23" />
      <path d="M545 295L573 286L578 316" stroke="#111111" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="742" cy="105" r="18" fill="#2F80ED" />
      <circle cx="804" cy="159" r="13" fill="#22A35A" />
      <circle cx="119" cy="329" r="16" fill="#FF5B45" />
      <rect x="108" y="98" width="44" height="44" rx="8" fill="#FFFFFF" stroke="#111111" strokeWidth="7" />
    </svg>
  );
}
