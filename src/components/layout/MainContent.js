// src/components/MainContent.js
import React, { useEffect, useState } from "react";
import "./MainContent.css";
import ExperienceCard from "../cards/ExperienceCard";
import ProjectCard from "../cards/ProjectCard";
import CertificationsSection from "../certifications/CertificationsSection";
import ArcusHero from "./ArcusHero";
import { handleContactFormSubmit } from "../../utils/emailService";
import { useData } from "../../context/DataContext";
import Section from "./Section";
import { SECTION_OBSERVER_OPTIONS } from "../../config/constants";

const MainContent = ({ onSectionChange }) => {
  const [activeSection, setActiveSection] = useState("about");
  const [showEarlierWork, setShowEarlierWork] = useState(false);
  const { experience, projects } = useData();

  // Featured = showFirst flag from sheet; fallback = tags.length > 5
  const featuredProjects = React.useMemo(() => {
    if (!projects.data) return [];
    return projects.data.filter(
      (p) => p.showFirst || (p.tags && p.tags.length > 5)
    );
  }, [projects.data]);

  const earlierProjects = React.useMemo(() => {
    if (!projects.data) return [];
    return projects.data.filter(
      (p) => !p.showFirst && !(p.tags && p.tags.length > 5)
    );
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
        title="Hello."
        className="about-section"
        activeSection={activeSection}
      >
        <div className="about-intro">
          <p>
            I'm a <strong>Full-Stack Software Engineer</strong> based in
            Melbourne. I founded and solo-engineered{" "}
            <strong>ArcusVision</strong> — a live AI productivity SaaS — from a
            blank repo to <strong>338+ active users</strong>, handling
            architecture, APIs, cloud infra, and CI/CD entirely alone. I don't
            just build features. I ship products.
          </p>
        </div>

        <div className="about-content">
          <article>
            <p>
              3+ years of commercial experience across IoT platforms, distributed
              backend systems, and AI-integrated SaaS. At{" "}
              <strong>AquaTerra</strong> I led a backend architecture revamp for
              a Node.js IoT system on AWS. At <strong>Avasoft</strong> I built
              TypeScript and Go APIs that lifted assessment accuracy by 25%. I
              move fast across the stack and I leave things better than I found
              them.
            </p>
          </article>
          <article>
            <p>
              Finishing a <strong>Master's in Information Technology</strong> at{" "}
              <strong>RMIT Melbourne</strong> — Full-Stack, Cloud, and DevOps.
              Available for full-time Software Engineering roles in Melbourne
              from mid-2026. If you're building something that needs to scale
              and ship, let's talk.
            </p>
          </article>
        </div>
      </Section>

      <ArcusHero />

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
          <>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
            {earlierProjects.length > 0 && (
              <div className="earlier-work">
                <button
                  className="earlier-work-toggle"
                  onClick={() => setShowEarlierWork((s) => !s)}
                >
                  {showEarlierWork
                    ? "Hide earlier work"
                    : `Show ${earlierProjects.length} earlier project${
                        earlierProjects.length !== 1 ? "s" : ""
                      }`}
                </button>
                {showEarlierWork &&
                  earlierProjects.map((project) => (
                    <ProjectCard key={project.title} {...project} />
                  ))}
              </div>
            )}
          </>
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
          Have a role or project you want to talk through? Drop me a message
          and I'll get back to you fast.
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
