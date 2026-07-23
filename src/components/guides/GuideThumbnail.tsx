import Image from "next/image";
import type { GuideSummary } from "@/content/guides/types";

export function GuideThumbnail({ guide, sizes }: { guide: GuideSummary; sizes: string }) {
  if (!guide.coverPhoto) {
    return (
      <span className="guide-card-text-cover" aria-hidden="true">
        <small>{guide.category}</small>
        <strong>{guide.shortTitle ?? guide.title}</strong>
      </span>
    );
  }

  return (
    <Image
      className="guide-thumbnail-photo"
      src={guide.coverPhoto.src}
      alt=""
      width={guide.coverPhoto.width}
      height={guide.coverPhoto.height}
      sizes={sizes}
      style={{ objectFit: guide.coverPhoto.fit ?? "cover", objectPosition: guide.coverPhoto.focalPoint ?? "center" }}
    />
  );
}
