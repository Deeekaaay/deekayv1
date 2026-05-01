// src/components/MobileNav.js
import React from "react";
import "../styles/MobileNav.css";

const NAV_ITEMS = [
  { id: "about", label: "About", icon: "fi-rr-user" },
  { id: "experience", label: "Work", icon: "fi-rr-briefcase" },
  { id: "projects", label: "Projects", icon: "fi-rr-rocket" },
  { id: "certifications", label: "Certs", icon: "fi-rr-diploma" },
  { id: "contact", label: "Contact", icon: "fi-rr-envelope" },
];

const MobileNav = ({ activeSection }) => {
  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {NAV_ITEMS.map(({ id, label, icon }) => (
        <button
          key={id}
          className={`mobile-nav-item${activeSection === id ? " active" : ""}`}
          onClick={() => scrollTo(id)}
          aria-label={`Navigate to ${label} section`}
        >
          <i className={`fi ${icon}`} aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
};

export default MobileNav;
