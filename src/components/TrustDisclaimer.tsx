import { siteContent } from "@/data/siteContent";

export function TrustDisclaimer() {
  return <p className="trust-disclaimer">{siteContent.trust.projectStatus}</p>;
}

