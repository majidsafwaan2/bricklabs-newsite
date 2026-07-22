import Link from "next/link";

export default function GuideNotFound() {
  return (
    <section className="section">
      <div className="container narrow not-found">
        <p className="eyebrow">Guide not found</p>
        <h1>This build wandered off.</h1>
        <p>The guide may have moved, but all published projects are still listed in the build library.</p>
        <Link className="button button-dark" href="/library">Browse all build guides</Link>
      </div>
    </section>
  );
}
