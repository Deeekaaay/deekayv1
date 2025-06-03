// src/components/Section.js
import React from "react";

/**
 * Generic section wrapper for main content sections.
 * @param {Object} props
 * @param {string} id - Section id for navigation
 * @param {string} title - Section heading
 * @param {string} className - Additional class names
 * @param {React.ReactNode} children - Section content
 * @param {string} activeSection - Current active section for highlighting
 */
const Section = ({ id, title, className = "", children, activeSection }) => (
  <section id={id} className={className}>
    <h2
      className={`mobile-section-heading${
        activeSection === id ? " active" : ""
      }`}
    >
      {title}
    </h2>
    {children}
  </section>
);

export default Section;
