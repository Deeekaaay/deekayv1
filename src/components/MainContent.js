// src/components/MainContent.js
import React, { useEffect, useState } from "react";
import "../styles/MainContent.css";
import ExperienceCard from "./ExperienceCard";
import ProjectCard from "./ProjectCard";
import CertificationsSection from "./certifications/CertificationsSection";
import { handleContactFormSubmit } from "../utils/emailService";
import useExperience from "../hooks/useExperience";
import useProjects from "../hooks/useProjects";
import Section from "./Section";

const MainContent = ({ onSectionChange }) => {
  const [activeSection, setActiveSection] = useState("about");
  
  // Use custom hooks for data fetching
  const {
    data: experienceData,
    loading: experienceLoading,
    error: experienceError,
  } = useExperience();
  
  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useProjects();

  useEffect(() => {
    const handleSectionChange = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          onSectionChange(entry.target.id);
        }
      });
    };

    const options = {
      threshold: 0.05,
    };

    const observer = new IntersectionObserver(handleSectionChange, options);
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [onSectionChange]);

  return (
    <main className="content text-main">
      <Section
        id="about"
        title="Hello World!"
        className="about-section"
        activeSection={activeSection}
      >
        <div className="about-intro">
          <p>
            I’m a Software Engineer based in Melbourne, passionate about
            building secure, scalable, and AI-driven applications. My journey
            blends backend engineering, DevOps, and workflow automation to solve
            real-world problems with modern technologies.
          </p>
        </div>

        <div className="about-content">
          <article>
            <p>
              It all began with a{" "}
              <strong>
                Bachelor’s in Electronics & Communication Engineering
              </strong>
              , where I built a strong foundation in computing and systems
              thinking. This curiosity led me to the world of{" "}
              <strong>software engineering</strong>, evolving into full-stack
              and backend development.
            </p>
            <p>
              Over the years, I’ve developed applications using
              <strong> React.js</strong>, <strong>TypeScript</strong>,{" "}
              <strong>Node.js</strong>,<strong> GoLang</strong>, and{" "}
              <strong>Python</strong>. One highlight was leading the development
              of an assessment platform that
              <strong> improved accuracy by 25%</strong>, showing my ability to
              deliver real business impact. I also enjoy designing APIs, and
              building microservices ensures maintainability and performance.
            </p>
          </article>
          <article>
            <p>
              Currently, I’m pursuing a{" "}
              <strong>Master’s in Information Technology</strong> at
              <strong> RMIT University (Melbourne)</strong>, specialising in
              <strong> Full-Stack Development</strong>, <strong>AI</strong>, and{" "}
              <strong>DevOps</strong>. My recent focus has been exploring
              <strong> large language models (LLMs)</strong> and
              <strong> AI workflow automation</strong> to stay ahead in the
              evolving tech landscape.
            </p>
            <p>
              Beyond coding, I value <strong>collaboration</strong>,
              <strong> agile thinking</strong>, and{" "}
              <strong>continuous learning</strong>. Whether contributing to
              startups, open-source, or innovative side projects, my goal is to
              build software that’s not only functional but also
              <strong> secure, maintainable, and future-ready</strong>.
            </p>
          </article>
        </div>
      </Section>

      <Section id="experience" title="Experience" activeSection={activeSection}>
        {experienceLoading ? (
          <div className="loading">Loading experience...</div>
        ) : experienceError ? (
          <div className="error">{experienceError}</div>
        ) : experienceData.length === 0 ? (
          <div className="empty">No experience data found.</div>
        ) : (
          experienceData.map((experience, index) => (
            <ExperienceCard key={index} {...experience} />
          ))
        )}
      </Section>
      <Section id="projects" title="Projects" activeSection={activeSection}>
        {projectLoading ? (
          <div className="loading">Loading projects...</div>
        ) : projectError ? (
          <div className="error">{projectError}</div>
        ) : projectData.length === 0 ? (
          <div className="empty">No project data found.</div>
        ) : (
          projectData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))
        )}
      </Section>
      <Section
        id="certifications"
        title="Certifications"
        activeSection={activeSection}
      >
        <CertificationsSection />
      </Section>
      <Section id="contact" title="Contact" activeSection={activeSection}>
        <p className="text-muted">
          💡 "Got a genius project idea? Or just want to chat about life, code,
          or your favorite anime? 🎥✨ Drop me a message below, and I promise to
          respond faster than Goku can go Super Saiyan! 🚀
        </p>
        <form id="contact-form" className="flex flex-col gap-2 p-medium">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
            className="p-small m-small rounded"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            required
            className="p-small m-small rounded"
          />
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            className="p-small m-small rounded"
          ></textarea>
          <button type="button" onClick={handleContactFormSubmit} className="rounded">
            Send
          </button>
        </form>
      </Section>
    </main>
  );
};

export default MainContent;
