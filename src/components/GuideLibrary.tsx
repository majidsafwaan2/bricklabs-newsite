"use client";

import { PlayCircle, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { GuideThumbnail } from "@/components/guides/GuideThumbnail";
import type { GuideSummary } from "@/content/guides/types";

type SortMode = "featured" | "time" | "cost" | "title";

export function GuideLibrary({
  guides,
  categories,
  difficulties
}: {
  guides: GuideSummary[];
  categories: readonly string[];
  difficulties: readonly string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [sort, setSort] = useState<SortMode>("featured");

  const filteredGuides = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const matching = guides.filter((guide) => {
      const categoryMatch = category === "All" || guide.category === category;
      const difficultyMatch = difficulty === "All" || guide.difficulty === difficulty;
      const searchHaystack = [
        guide.title,
        guide.description,
        guide.category,
        guide.difficulty,
        ...guide.materialsPreview,
        ...guide.concepts,
        ...guide.tags
      ].join(" ").toLowerCase();

      return categoryMatch && difficultyMatch && (!normalizedQuery || searchHaystack.includes(normalizedQuery));
    });

    return matching.toSorted((a, b) => {
      if (sort === "time") return a.timeMinutes - b.timeMinutes;
      if (sort === "cost") return a.maxCost - b.maxCost;
      if (sort === "title") return a.title.localeCompare(b.title);
      return Number(b.featured) - Number(a.featured) || a.number - b.number;
    });
  }, [category, difficulty, guides, query, sort]);

  return (
    <div className="library-tool">
      <div className="filter-panel" aria-label="Build guide filters">
        <label className="search-field">
          <Search size={20} aria-hidden="true" />
          <span className="sr-only">Search build guides</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search gears, cardboard, coding, friction..."
            type="search"
          />
        </label>
        <div className="filter-selects">
          <label><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Difficulty</span><select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}><option>All</option>{difficulties.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}><option value="featured">Featured first</option><option value="time">Shortest time</option><option value="cost">Lowest cost</option><option value="title">A-Z</option></select></label>
        </div>
      </div>
      <p className="result-count" role="status"><SlidersHorizontal size={17} aria-hidden="true" /> Showing {filteredGuides.length} of {guides.length} complete guides.</p>
      <div className="guide-grid">
        {filteredGuides.map((guide) => (
          <article className="guide-card" key={guide.slug}>
            <Link className="guide-card-image" href={`/library/${guide.slug}`} tabIndex={-1} aria-hidden="true">
              <GuideThumbnail guide={guide} sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1120px) 50vw, 33vw" />
            </Link>
            <div className="guide-card-body">
              <div className="guide-card-top"><span>{guide.category}</span>{guide.hasVideo ? <span className="video-badge"><PlayCircle size={16} aria-hidden="true" /> Video</span> : null}</div>
              <h2><Link href={`/library/${guide.slug}`}>{guide.title}</Link></h2>
              <p>{guide.description}</p>
              <dl className="guide-card-facts"><div><dt>Level</dt><dd>{guide.difficulty}</dd></div><div><dt>Time</dt><dd>{guide.estimatedTime}</dd></div><div><dt>Cost</dt><dd>{guide.estimatedCost}</dd></div></dl>
              <Link className="guide-card-cta" href={`/library/${guide.slug}`}>Start this build <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        ))}
      </div>
      {filteredGuides.length === 0 ? <div className="empty-state" role="status"><h2>No builds match yet.</h2><p>Try a broader material, concept, category, or difficulty.</p><button className="button button-secondary" type="button" onClick={() => { setQuery(""); setCategory("All"); setDifficulty("All"); }}>Clear filters</button></div> : null}
    </div>
  );
}
