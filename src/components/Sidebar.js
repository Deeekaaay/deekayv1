// src/components/Sidebar.js
import React from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ activeSection }) => {
  return (
    <aside className="sidebar">
      <section id="about-section">
        <h1>Dineshkumar Suresh</h1>
        <h3>Software Engineer | AI Engineer</h3>
        <p>
          Innovative Full-Stack Developer | Expertise in React.js, Node.js,
          GoLang, Data Visualization (D3.js) | Agile Enthusiast | Building
          Scalable Solutions
        </p>
      </section>
      <nav class="nav-links">
        <ul>
          <li>
            <a
              className={`group flex items-center py-3 ${
                activeSection === "about" ? "active" : ""
              }`}
              href="#about"
            >
              <span class="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
              <span class="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
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
              <span class="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
              <span class="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
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
              <span class="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
              <span class="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
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
              <span class="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
              <span class="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                certifications
              </span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="social-icons">
        <a
          href="mailto:dineshdeekay.me@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fi fi-brands-google"></i>
        </a>
        <a
          href="https://github.com/Deeekaaay"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fi fi-brands-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/deeekay/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fi fi-brands-linkedin"></i>
        </a>
        <a
          href="https://www.instagram.com/_.dinesshhh._/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fi fi-brands-instagram"></i>
        </a>
        <a
          href="https://x.com/deekayaussie"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fi fi-brands-twitter-alt"></i>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
