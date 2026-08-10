import Image from "next/image";
import { siteContent } from "@/data/siteContent";

export function CongressionalRecognition() {
  const recognition = siteContent.congressionalRecognition;

  return (
    <section
      id="congressional-recognition"
      className="section recognition-section"
      aria-labelledby="congressional-recognition-heading"
    >
      <div className="container recognition-layout">
        <div className="recognition-copy">
          <p className="eyebrow">A letter from the U.S. Senate</p>
          <h2 id="congressional-recognition-heading">{recognition.title}</h2>
          <p>{recognition.description}</p>
          <blockquote>{recognition.quote}</blockquote>
        </div>

        <figure className="recognition-letter">
          <a
            href={recognition.imagePath}
            target="_blank"
            rel="noreferrer"
            aria-label="Open the recognition letter"
          >
            <Image
              src={recognition.imagePath}
              alt="Recognition letter from United States Senator Mark R. Warner to Safwaan Majid."
              width={1221}
              height={1600}
            />
          </a>
          <figcaption>{recognition.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
