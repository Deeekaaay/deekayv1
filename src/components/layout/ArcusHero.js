// src/components/ArcusHero.js
import React from "react";
import "./ArcusHero.css";

const ArcusHero = () => (
  <div className="arcus-hero">
    {/* Left amber accent bar */}
    <div className="arcus-hero__accent" />

    <div className="arcus-hero__body">
      {/* Eyebrow */}
      <p className="arcus-hero__eyebrow">Featured Product</p>

      {/* Title row */}
      <div className="arcus-hero__title-row">
        <h2 className="arcus-hero__name">ArcusVision</h2>
        <span className="arcus-hero__live-badge">● Live</span>
      </div>

      {/* One-line description */}
      <p className="arcus-hero__desc">
        AI productivity SaaS — built and shipped solo. Full ownership: architecture,
        APIs, cloud infra, CI/CD, and ongoing iteration.
      </p>

      {/* Metrics row */}
      <div className="arcus-hero__metrics">
        <div className="arcus-hero__metric">
          <span className="arcus-hero__metric-value">338+</span>
          <span className="arcus-hero__metric-label">active users</span>
        </div>
        <div className="arcus-hero__metric-divider" />
        <div className="arcus-hero__metric">
          <span className="arcus-hero__metric-value">Solo</span>
          <span className="arcus-hero__metric-label">end-to-end ownership</span>
        </div>
        <div className="arcus-hero__metric-divider" />
        <div className="arcus-hero__metric">
          <span className="arcus-hero__metric-value">Prod</span>
          <span className="arcus-hero__metric-label">live in production</span>
        </div>
      </div>

      {/* Tech tags + CTAs row */}
      <div className="arcus-hero__footer">
        <ul className="arcus-hero__tags">
          {["Next.js", "TypeScript", "Go", "AWS Lambda", "Supabase", "RAG"].map((t) => (
            <li key={t} className="arcus-hero__tag">{t}</li>
          ))}
        </ul>
        <div className="arcus-hero__ctas">
          <a
            href="https://arcusvision.app"
            target="_blank"
            rel="noopener noreferrer"
            className="arcus-cta-primary"
          >
            View App ↗
          </a>
          <a
            href="https://github.com/Deeekaaay"
            target="_blank"
            rel="noopener noreferrer"
            className="arcus-cta-secondary"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default ArcusHero;
