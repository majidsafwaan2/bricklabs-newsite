import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  children,
  centered = false
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "section-header centered" : "section-header"}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

