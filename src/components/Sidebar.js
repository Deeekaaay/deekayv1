// src/components/Sidebar.js
import React from "react";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <section id="about">
        <h1>Dineshkumar Suresh</h1>
        <h2>Software Engineer | AI Engineer</h2>
        <p>
          Innovative Full-Stack Developer | Expertise in React.js, Node.js,
          GoLang, Data Visualization (D3.js) | Agile Enthusiast | Building
          Scalable Solutions
        </p>
      </section>
      <nav className="nav-links">
        <ul>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
        </ul>
      </nav>
      <div className="social-icons">
        <a href="#">
          <i className="icon-github"></i>
        </a>
        <a href="#">
          <i className="icon-linkedin"></i>
        </a>
        <a href="#">
          <i className="icon-twitter"></i>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
