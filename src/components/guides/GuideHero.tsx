import Image from "next/image";
import Link from "next/link";
import type { GuideArticle } from "@/content/guides/types";

export function GuideHero({ guide }: { guide: GuideArticle }) {
  return (
    <header className="guide-article-hero">
      <div className="container guide-article-hero-grid">
        <div className="guide-article-heading">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/library">Library</Link></li>
              <li aria-current="page">{guide.title}</li>
            </ol>
          </nav>
          <p className="eyebrow">{guide.category}</p>
          <h1>{guide.title}</h1>
          <p className="guide-deck">{guide.description}</p>
          <p className="guide-hook">{guide.hook}</p>
        </div>
        <figure className="guide-hero-visual">
          <Image src={guide.heroImage} alt={guide.heroAlt} width={1200} height={800} priority />
        </figure>
      </div>
    </header>
  );
}
