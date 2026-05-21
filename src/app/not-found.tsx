import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container narrow not-found">
        <p className="eyebrow">404</p>
        <h1>That page is not built yet.</h1>
        <p>Try the build library, sponsor page, or school support request instead.</p>
        <Link className="button button-dark" href="/">
          Back to home
        </Link>
      </div>
    </section>
  );
}

