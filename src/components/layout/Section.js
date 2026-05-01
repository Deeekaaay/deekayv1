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
const Section = ({ id, title, className = "", children, activeSection }) => {
  // Animation: add 'animated' class when section is in view
  const ref = React.useRef();
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.classList.add("animated");
        } else {
          node.classList.remove("animated"); // Remove animation when out of view for re-trigger
        }
      });
    };
    const observer = new window.IntersectionObserver(onIntersect, {
      threshold: 0.2,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} className={`section-transition ${className}`} ref={ref}>
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
};

export default Section;
