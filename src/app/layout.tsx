import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.brand.siteUrl),
  title: {
    default: "BricklabClips - Build What You Imagine",
    template: "%s | BricklabClips"
  },
  description:
    "Free build guides, open student challenges, and funded school materials for hands-on building.",
  openGraph: {
    title: "BricklabClips - Build What You Imagine",
    description:
      "Free build guides, open student challenges, and funded school materials for hands-on building.",
    url: siteContent.brand.siteUrl,
    siteName: "BricklabClips",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "BricklabClips - Build What You Imagine",
    description:
      "Free build guides, open student challenges, and funded school materials for hands-on building."
  },
  icons: {
    icon: [{ url: "/images/bricklabs-logo.jpg?v=bricklabs-logo", type: "image/jpeg" }],
    shortcut: [{ url: "/images/bricklabs-logo.jpg?v=bricklabs-logo", type: "image/jpeg" }],
    apple: [{ url: "/images/bricklabs-logo.jpg?v=bricklabs-logo", type: "image/jpeg" }]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
