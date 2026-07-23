import type { GuidePhoto } from "@/content/guides/types";

export function PhotoCaption({ photo, caption = photo.caption }: { photo: GuidePhoto; caption?: string }) {
  const suppliedCredit = photo.sourceType === "user-provided" ? "Image supplied by the site owner." : null;
  const creatorCredit = photo.creator ? `Image by ${photo.creator}.` : null;
  const licenseCredit = photo.licenseName ? ` ${photo.licenseName}.` : "";

  return (
    <figcaption>
      <span>{caption}</span>
      {photo.sourceUrl ? (
        <small><a href={photo.sourceUrl} target="_blank" rel="noreferrer">{creatorCredit ?? "View image source."}</a>{licenseCredit}</small>
      ) : suppliedCredit || creatorCredit ? <small>{creatorCredit ?? suppliedCredit}{licenseCredit}</small> : null}
    </figcaption>
  );
}
