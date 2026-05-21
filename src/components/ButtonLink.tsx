import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "ghost";
};

export function ButtonLink({ children, variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return (
    <Link className={`button button-${variant} ${className}`.trim()} {...props}>
      {children}
    </Link>
  );
}

type ButtonAnchorProps = ComponentProps<"a"> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "ghost";
};

export function ButtonAnchor({ children, variant = "primary", className = "", ...props }: ButtonAnchorProps) {
  return (
    <a className={`button button-${variant} ${className}`.trim()} {...props}>
      {children}
    </a>
  );
}

