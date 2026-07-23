import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Lightbulb, ShieldCheck, Wrench } from "lucide-react";
import type { GuideArticle as GuideArticleType, GuideSummary } from "@/content/guides/types";
import { BuildStep } from "./BuildStep";
import { GuideHero } from "./GuideHero";
import { GuideQuickFacts } from "./GuideQuickFacts";
import { GuideThumbnail } from "./GuideThumbnail";
import { MaterialsChecklist } from "./MaterialsChecklist";
import { PhotoCaption } from "./PhotoCaption";
import { PrintButton } from "./PrintButton";
import { TikTokEmbed } from "./TikTokEmbed";

const toc = [
  ["result", "What you will build"],
  ["materials", "Materials and safety"],
  ["steps", "Build steps"],
  ["concepts", "Why it works"],
  ["testing", "Test and tune"],
  ["extensions", "Try another version"],
  ["classroom", "Classroom version"]
] as const;

export function GuideArticle({ guide, related }: { guide: GuideArticleType; related: GuideSummary[] }) {
  return (
    <article className="guide-article">
      <GuideHero guide={guide} />
      <div className="container guide-article-shell">
        <aside className="guide-toc" aria-label="On this page">
          <p>On this page</p>
          <ol>{toc.map(([href, label]) => <li key={href}><a href={`#${href}`}>{label}</a></li>)}</ol>
          <PrintButton />
        </aside>

        <div className="guide-article-body">
          <GuideQuickFacts guide={guide} />

          <section id="result" className="article-section">
            <p className="eyebrow">The finish line</p>
            <h2>What you will build</h2>
            <p className="article-lead">{guide.finishedResult}</p>
            <div className="learning-panel">
              <BookOpen size={26} aria-hidden="true" />
              <div><h3>Learning goals</h3><ul>{guide.learningObjectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></div>
            </div>
          </section>

          <section id="materials" className="article-section">
            <p className="eyebrow">Before you build</p>
            <h2>Materials, tools, and safety</h2>
            <p><strong>Reuse-material cost:</strong> {guide.reuseCost}. <strong>Supervision:</strong> {guide.supervision}.</p>
            <MaterialsChecklist materials={guide.materials} />
            <div className="article-split">
              <div className="article-card"><Wrench size={24} aria-hidden="true" /><h3>Tools</h3><ul>{guide.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></div>
              <div className="article-card"><Lightbulb size={24} aria-hidden="true" /><h3>Low-cost swaps</h3><ul>{guide.alternatives.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
            {guide.wiring ? <div className="guide-wiring"><h3>Wiring table</h3><div className="table-scroll"><table><thead><tr><th>From</th><th>To</th><th>Purpose</th></tr></thead><tbody>{guide.wiring.map((row) => <tr key={`${row.from}-${row.to}`}><td>{row.from}</td><td>{row.to}</td><td>{row.purpose}</td></tr>)}</tbody></table></div></div> : null}
            <div className="safety-panel"><ShieldCheck size={28} aria-hidden="true" /><div><h3>Project-specific safety</h3><ul>{guide.safety.map((warning) => <li key={warning}>{warning}</li>)}</ul></div></div>
            <div className="orientation-panel"><h3>Orient the build</h3><p>{guide.orientation}</p></div>
          </section>

          <section id="steps" className="article-section">
            <p className="eyebrow">Build it</p>
            <h2>Step-by-step instructions</h2>
            <ol className="build-step-list">{guide.steps.map((step, index) => <BuildStep key={step.id} step={step} number={index + 1} />)}</ol>
          </section>

          {guide.video ? <TikTokEmbed video={guide.video} /> : null}

          <section id="concepts" className="article-section">
            <p className="eyebrow">See the engineering</p>
            <h2>Why it works</h2>
            <dl className="motion-map">
              <div><dt>Input</dt><dd>{guide.input}</dd></div>
              <div><dt>Output</dt><dd>{guide.output}</dd></div>
              <div><dt>Motion</dt><dd>{guide.motion}</dd></div>
              <div><dt>Energy losses</dt><dd>{guide.efficiencyLosses.join(", ")}</dd></div>
            </dl>
            <figure className="concept-figure"><Image src={guide.conceptVisual.src} alt={guide.conceptVisual.alt} width={1200} height={760} /><figcaption>{guide.conceptVisual.caption}</figcaption></figure>
            <div className="concept-grid">{guide.conceptPauses.map((pause) => <div className="concept-pause" key={pause.title}><p className="eyebrow">{pause.title}</p><h3>{pause.concept}</h3><p>{pause.explanation}</p><p><strong>Look for:</strong> {pause.observe}</p></div>)}</div>
            <div className="math-bite"><p className="eyebrow">Math bite</p><h3>{guide.mathBite.title}</h3><p><strong>Formula:</strong> <code>{guide.mathBite.formula}</code></p><ul>{guide.mathBite.variables.map((variable) => <li key={variable}>{variable}</li>)}</ul><p><strong>Substitute:</strong> {guide.mathBite.substitution}</p><p><strong>Result:</strong> {guide.mathBite.result}</p><p>{guide.mathBite.interpretation}</p><small>{guide.mathBite.assumptions}</small></div>
            {guide.code ? <div className="code-panel"><h3>{guide.code.filename}</h3><p>{guide.code.explanation}</p><pre><code>{guide.code.source}</code></pre></div> : null}
            <figure className="builder-moment">
              <Image
                src={guide.builderMomentPhoto.src}
                alt={guide.builderMomentPhoto.alt}
                width={guide.builderMomentPhoto.width}
                height={guide.builderMomentPhoto.height}
              />
              <PhotoCaption photo={guide.builderMomentPhoto} caption={guide.builderMoment} />
            </figure>
          </section>

          <section id="testing" className="article-section">
            <p className="eyebrow">Make it behave</p>
            <h2>Test, troubleshoot, and tune</h2>
            <div className="test-plan"><h3>Controlled test</h3><p><strong>Start here:</strong> {guide.testing.firstTest}</p><p><strong>Success looks like:</strong> {guide.testing.success}</p><p><strong>Measure:</strong> {guide.testing.measure}</p><p><strong>Change:</strong> {guide.testing.variable}</p><p><strong>Keep constant:</strong> {guide.testing.controls}</p><ol>{guide.testing.trials.map((trial) => <li key={trial}>{trial}</li>)}</ol></div>
            <div className="troubleshooting-table-wrap"><table><caption>Troubleshooting guide</caption><thead><tr><th>Symptom</th><th>Likely cause</th><th>Confirm it</th><th>Fix</th></tr></thead><tbody>{guide.troubleshooting.map((item) => <tr key={item.symptom}><th scope="row">{item.symptom}</th><td>{item.likelyCause}</td><td>{item.confirm}</td><td>{item.fix}</td></tr>)}</tbody></table></div>
            <div className="tuning-note"><h3>Choose your tradeoff</h3><p>{guide.tuning}</p></div>
          </section>

          <section id="extensions" className="article-section">
            <p className="eyebrow">Keep experimenting</p><h2>Try another version</h2>
            <div className="extension-grid">{guide.extensions.map((extension) => <article key={extension.title}><span>{extension.level}</span><h3>{extension.title}</h3><p>{extension.description}</p></article>)}</div>
          </section>

          <section id="classroom" className="article-section">
            <p className="eyebrow">Build together</p><h2>Classroom and access options</h2>
            <div className="article-split"><div className="article-card"><h3>Classroom version</h3><p>{guide.classroomAdaptation}</p></div><div className="article-card"><h3>Access adaptations</h3><ul>{guide.accessibility.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
            <h3>Reflect on the design</h3><ol>{guide.reflectionQuestions.map((question) => <li key={question}>{question}</li>)}</ol>
            <details className="guide-glossary"><summary>Glossary</summary><dl>{guide.glossary.map((item) => <div key={item.term}><dt>{item.term}</dt><dd>{item.definition}</dd></div>)}</dl></details>
          </section>

          <section className="guide-mission-cta"><p className="eyebrow">Build your dreams</p><h2>One build can start the next.</h2><p>Share what you learned, change one variable, and help another builder understand what worked.</p><Link className="button button-dark" href="/library">Explore more guides <ArrowRight size={18} aria-hidden="true" /></Link></section>

          <section className="article-section source-notes"><h2>Sources and build notes</h2><p>{guide.sourceType}</p><ul>{guide.sources.map((source) => <li key={source.label}>{source.href ? <a href={source.href} target="_blank" rel="noreferrer">{source.label}</a> : <strong>{source.label}</strong>}: {source.note}</li>)}</ul><p className="editor-note">Written and edited by BrickLabClips. Published {guide.publishedAt}; updated {guide.updatedAt}.</p></section>

          {related.length > 0 ? <section className="article-section related-guides"><p className="eyebrow">Next builds</p><h2>Related guides</h2><div>{related.map((item) => <Link key={item.slug} href={`/library/${item.slug}`}><div className="related-guide-media"><GuideThumbnail guide={item} sizes="(max-width: 760px) calc(100vw - 60px), 280px" /></div><span>{item.category}</span><h3>{item.title}</h3><p>{item.description}</p></Link>)}</div></section> : null}
        </div>
      </div>
    </article>
  );
}
