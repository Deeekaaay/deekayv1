// src/components/MainContent.js
import React, { useEffect, useState } from "react";
import "../styles/MainContent.css";
import ExperienceCard from "./ExperienceCard";
import ProjectCard from "./ProjectCard";
import CertificationsSection from "./certifications/CertificationsSection";
import { handleContactFormSubmit } from "../utils/emailService";
import { useData } from "../context/DataContext";
import Section from "./Section";
import { SECTION_OBSERVER_OPTIONS } from "../config/constants";

const MainContent = ({ onSectionChange }) => {
  const [activeSection, setActiveSection] = useState("about");
  const { experience, projects } = useData();

  // Sort projects so "Featured" (tags length > 5) appear first
  const sortedProjects = React.useMemo(() => {
    if (!projects.data) return [];
    return [...projects.data].sort((a, b) => {
      const aIsFeatured = a.tags && a.tags.length > 5;
      const bIsFeatured = b.tags && b.tags.length > 5;
      if (aIsFeatured && !bIsFeatured) return -1;
      if (!aIsFeatured && bIsFeatured) return 1;
      return 0; // maintain original order otherwise
    });
  }, [projects.data]);

  useEffect(() => {
    const handleSectionChange = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          onSectionChange(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleSectionChange,
      SECTION_OBSERVER_OPTIONS,
    );
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
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
            I'm a <strong>Full Stack Software Engineer</strong> based in
            Melbourne, Australia, passionate about building secure, scalable,
            and high-performance applications. My expertise bridges{" "}
            <strong>backend engineering</strong>,{" "}
            <strong>frontend development</strong>, and{" "}
            <strong>Cloud/DevOps</strong> to deliver end-to-end solutions.
          </p>
        </div>

        <div className="about-content">
          <article>
            <p>
              It all began with a{" "}
              <strong>
                Bachelor's in Electronics &amp; Communication Engineering
              </strong>
              , where I built a strong foundation in computing and systems
              thinking. This curiosity led me to the world of{" "}
              <strong>software engineering</strong>, evolving into full-stack
              and backend development.
            </p>
            <p>
              Over the years, I've developed applications using
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
              I recently enhanced my technical prowess via a{" "}
              <strong>Master's in Information Technology</strong> at
              <strong> RMIT University (Melbourne)</strong>, specialising in
              <strong> Full-Stack Development</strong>,{" "}
              <strong>Cloud Computing</strong>, and <strong>DevOps</strong>. I
              have robust hands-on experience deploying scalable architecture on
              <strong> AWS</strong> and setting up efficient{" "}
              <strong>CI/CD pipelines</strong>.
            </p>
            <p>
              Beyond coding, I value <strong>collaboration</strong>,
              <strong> agile thinking</strong>, and{" "}
              <strong>continuous learning</strong>. Whether contributing to
              startups, open-source, or innovative side projects, my goal is to
              build software that's not only functional but also
              <strong> secure, maintainable, and future-ready</strong>.
            </p>
          </article>
        </div>
      </Section>

      <Section id="experience" title="Experience" activeSection={activeSection}>
        {experience.loading ? (
          <div className="loading">Loading experience...</div>
        ) : experience.error ? (
          <div className="error">{experience.error}</div>
        ) : experience.data.length === 0 ? (
          <div className="empty">No experience data found.</div>
        ) : (
          experience.data.map((exp) => (
            <ExperienceCard key={exp.title} {...exp} />
          ))
        )}
      </Section>

      <Section id="projects" title="Projects" activeSection={activeSection}>
        {projects.loading ? (
          <div className="loading">Loading projects...</div>
        ) : projects.error ? (
          <div className="error">{projects.error}</div>
        ) : projects.data.length === 0 ? (
          <div className="empty">No project data found.</div>
        ) : (
          sortedProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
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
          <button
            type="button"
            onClick={handleContactFormSubmit}
            className="rounded"
          >
            Send
          </button>
        </form>
      </Section>
    </main>
  );
};

export default MainContent;
