import Image from "next/image";
import Link from "next/link";
import type { GuideArticle } from "@/content/guides/types";
import { PhotoCaption } from "./PhotoCaption";

export function GuideHero({ guide }: { guide: GuideArticle }) {
  const photo = guide.coverPhoto;

  return (
    <header className={`guide-article-hero ${photo ? "has-cover-photo" : "text-only"}`}>
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
        {photo ? (
          <figure className="guide-hero-visual">
            <div className="guide-photo-frame">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                priority
                style={{ objectFit: photo.fit ?? "cover", objectPosition: photo.focalPoint ?? "center" }}
              />
            </div>
            <PhotoCaption photo={photo} />
          </figure>
        ) : null}
      </div>
    </header>
  );
}
