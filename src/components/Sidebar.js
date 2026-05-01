// src/components/Sidebar.js
import React from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ activeSection }) => {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="sidebar p-large">
      <section id="about-section">
        <h1>Dineshkumar Suresh</h1>
        <h3 className="text-main">
          Full Stack Software Engineer | Backend Specialist
        </h3>
        <p className="text-muted tagline">
          Building production systems in Melbourne — Next.js · Go · AWS
        </p>
        <div className="mt-4">
          <a
            href="/assets/DineshkumarDeekay.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn"
          >
            Download CV
          </a>
        </div>
      </section>

      <nav className="nav-links" aria-label="Page sections">
        <ul className="list-none p-0">
          {[
            { id: "about", label: "About" },
            { id: "experience", label: "Experience" },
            { id: "projects", label: "Projects" },
            { id: "certifications", label: "Certifications" },
            { id: "contact", label: "Contact" },
          ].map(({ id, label }) => (
            <li key={id}>
              <a
                className={`group flex items-center py-3 ${
                  activeSection === id ? "active" : ""
                }`}
                href={`#${id}`}
                onClick={(e) => scrollTo(e, id)}
              >
                <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="social-icons flex">
        <a
          href="mailto:dineshdeekay.me@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Send email to Dineshkumar Suresh"
        >
          <i className="fi fi-brands-google" aria-hidden="true"></i>
        </a>
        <a
          href="https://github.com/Deeekaaay"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
        >
          <i className="fi fi-brands-github" aria-hidden="true"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/deeekay/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          <i className="fi fi-brands-linkedin" aria-hidden="true"></i>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
