import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/data/siteContent";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Image src={siteContent.brand.logoPath} alt="BricklabClips logo." width={974} height={974} />
          <p>{siteContent.brand.shortDescription}</p>
        </div>
        <nav aria-label="Footer navigation">
          {siteContent.footer.links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="footer-disclaimer">{siteContent.trust.legoDisclaimer}</p>
    </footer>
  );
}
