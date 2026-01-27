// src/components/Sidebar.js
import React from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ activeSection }) => {
  // Smooth scroll for nav links
  React.useEffect(() => {
    const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").replace("#", "");
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <aside className="sidebar p-large">
      <section id="about-section">
        <h1>Dineshkumar Suresh</h1>
        <h3 className="text-main">
          Software Engineer | AI & DevOps Enthusiast | Backend Specialist
        </h3>
        <p className="text-muted tagline">
          React.js, Node.js & GoLang | Agile & DevOps
          Enthusiast | AI Workflow Automation  | RMIT Master's Student | Open to Internships & Part-Time
          Roles in Melbourne
        </p>
      </section>
      <nav className="nav-links">
        <ul className="list-none p-0">
          <li>
            <a
              className={`group flex items-center py-3 ${
                activeSection === "about" ? "active" : ""
              }`}
              href="#about"
            >
              <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
              <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                About
              </span>
            </a>
          </li>
          <li>
            <a
              className={`group flex items-center py-3 ${
                activeSection === "experience" ? "active" : ""
              }`}
              href="#experience"
            >
              <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
              <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                Experience
              </span>
            </a>
          </li>
          <li>
            <a
              className={`group flex items-center py-3 ${
                activeSection === "projects" ? "active" : ""
              }`}
              href="#projects"
            >
              <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
              <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                Projects
              </span>
            </a>
          </li>
          <li>
            <a
              className={`group flex items-center py-3 ${
                activeSection === "certifications" ? "active" : ""
              }`}
              href="#certifications"
            >
              <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
              <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                certifications
              </span>
            </a>
          </li>
          <li>
            <a
              className={`group flex items-center py-3 ${
                activeSection === "contact" ? "active" : ""
              }`}
              href="#contact"
            >
              <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
              <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                contact
              </span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="social-icons flex">
        <a
          href="mailto:dineshdeekay.me@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fi fi-brands-google"></i>
        </a>
        <a
          href="https://github.com/Deeekaaay"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fi fi-brands-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/deeekay/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fi fi-brands-linkedin"></i>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
