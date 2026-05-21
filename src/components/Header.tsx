"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteContent } from "@/data/siteContent";
import { ButtonLink } from "./ButtonLink";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="nav-wrap">
        <Link className="brand-link" href="/" aria-label="BricklabClips home" onClick={closeMenu}>
          <Image src={siteContent.brand.logoPath} alt="BricklabClips logo." width={974} height={974} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {siteContent.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "nav-link active" : "nav-link"}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="desktop-actions">
          <ButtonLink href={siteContent.ctas.requestSupport.href} variant="dark">
            {siteContent.ctas.requestSupport.label}
          </ButtonLink>
        </div>
        <button
          className="mobile-menu-button"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
      <nav id="mobile-navigation" className={isOpen ? "mobile-nav open" : "mobile-nav"} aria-label="Mobile navigation">
        {siteContent.navLinks.map((link) => (
          <Link key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
        <ButtonLink href={siteContent.ctas.requestSupport.href} variant="dark" onClick={closeMenu}>
          {siteContent.ctas.requestSupport.label}
        </ButtonLink>
      </nav>
    </header>
  );
}
