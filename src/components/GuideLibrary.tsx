"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { LibraryGuide } from "@/data/siteContent";

const statusLabels = {
  published: "Published",
  draft: "Starter draft",
  "coming-soon": "Coming soon"
} as const;

export function GuideLibrary({
  guides,
  categories,
  difficulties
}: {
  guides: readonly LibraryGuide[];
  categories: readonly string[];
  difficulties: readonly string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const filteredGuides = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return guides.filter((guide) => {
      const categoryMatch = category === "All" || guide.category === category;
      const difficultyMatch = difficulty === "All" || guide.difficulty === difficulty;
      const searchHaystack = [
        guide.title,
        guide.category,
        guide.difficulty,
        guide.description,
        guide.materials.join(" "),
        guide.concepts.join(" ")
      ]
        .join(" ")
        .toLowerCase();

      return categoryMatch && difficultyMatch && (!normalizedQuery || searchHaystack.includes(normalizedQuery));
    });
  }, [category, difficulty, guides, query]);

  return (
    <div className="library-tool">
      <div className="filter-panel" aria-label="Build guide filters">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search build guides</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by material, concept, or build"
            type="search"
          />
        </label>
        <div className="filter-group" aria-label="Category filters">
          <button className={category === "All" ? "chip active" : "chip"} type="button" onClick={() => setCategory("All")}>
            All
          </button>
          {categories.map((item) => (
            <button key={item} className={category === item ? "chip active" : "chip"} type="button" onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="filter-group" aria-label="Difficulty filters">
          <button className={difficulty === "All" ? "chip active" : "chip"} type="button" onClick={() => setDifficulty("All")}>
            All levels
          </button>
          {difficulties.map((item) => (
            <button
              key={item}
              className={difficulty === item ? "chip active" : "chip"}
              type="button"
              onClick={() => setDifficulty(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="result-count">Showing {filteredGuides.length} starter guides.</p>
      <div className="guide-grid">
        {filteredGuides.map((guide) => (
          <article className="guide-card card" key={guide.title}>
            <div className="guide-card-top">
              <span>{guide.category}</span>
              <span>{guide.difficulty}</span>
            </div>
            <h3>{guide.title}</h3>
            <p>{guide.description}</p>
            <dl className="guide-details compact">
              <div>
                <dt>Status</dt>
                <dd>{statusLabels[guide.status]}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{guide.estimatedTime}</dd>
              </div>
            </dl>
            <details className="guide-more">
              <summary>View guide details</summary>
              <div className="guide-list">
                <strong>Materials</strong>
                <p>{guide.materials.join(", ")}</p>
              </div>
              <div className="guide-list">
                <strong>Low-cost alternatives</strong>
                <p>{guide.alternatives.join(", ")}</p>
              </div>
              <div className="guide-list">
                <strong>Concepts</strong>
                <p>{guide.concepts.join(", ")}</p>
              </div>
            </details>
            <div className="placeholder-link guide-cta">
              {guide.videoUrl ? (
                <a href={guide.videoUrl}>Open video/demo</a>
              ) : (
                <span>Video link coming soon</span>
              )}
            </div>
          </article>
        ))}
      </div>
      {filteredGuides.length === 0 ? (
        <div className="empty-state" role="status">
          No starter guides match those filters yet.
        </div>
      ) : null}
    </div>
  );
}
