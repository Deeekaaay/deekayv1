// src/components/MainContent.js
import React, { useEffect, useState } from "react";
import "../styles/MainContent.css";
import ExperienceCard from "./ExperienceCard";
import ProjectCard from "./ProjectCard";
import emailjs from "@emailjs/browser";
import Papa from "papaparse";
import Section from "./Section";

const MainContent = ({ onSectionChange }) => {
  const [activeSection, setActiveSection] = useState("about");
  const [experienceData, setExperienceData] = useState([]);
  const [certificationData, setCertificationData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [experienceLoading, setExperienceLoading] = useState(true);
  const [experienceError, setExperienceError] = useState(null);
  const [certificationLoading, setCertificationLoading] = useState(true);
  const [certificationError, setCertificationError] = useState(null);
  const [projectLoading, setProjectLoading] = useState(true);
  const [projectError, setProjectError] = useState(null);

  useEffect(() => {
    const handleSectionChange = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id); // Update the active section
          onSectionChange(entry.target.id); // Notify the parent of the active section
        }
      });
    };

    // Lower threshold for more sensitive section detection
    const options = {
      threshold: 0.05,
    };

    const observer = new IntersectionObserver(handleSectionChange, options);

    // Select all sections to observe
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    // Cleanup the observer on unmount
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [onSectionChange]);

  useEffect(() => {
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdCHB-aGuhU0G6641f5IvhB4lKtKZnY9-wqtiVdNGo1fzB7SYeA7_1WoZtRRG2Z3CiPsYf55n_CQ1A/pub?output=csv";
    setCertificationLoading(true);
    setCertificationError(null);
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (results) => {
        try {
          setCertificationData(
            results.data
              .filter((row) => row.title)
              .map((row) => {
                let image = row.image;
                return {
                  ...row,
                  image,
                  tags: row.tags ? row.tags.split(/,\s*/) : [],
                };
              })
          );
          setCertificationLoading(false);
        } catch (err) {
          setCertificationError("Failed to load certifications.");
          setCertificationLoading(false);
        }
      },
      error: (err) => {
        setCertificationError("Failed to load certifications.");
        setCertificationLoading(false);
      },
    });
  }, []);

  useEffect(() => {
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdCHB-aGuhU0G6641f5IvhB4lKtKZnY9-wqtiVdNGo1fzB7SYeA7_1WoZtRRG2Z3CiPsYf55n_CQ1A/pub?gid=485602198&single=true&output=csv";
    setExperienceLoading(true);
    setExperienceError(null);
    setProjectLoading(true);
    setProjectError(null);
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (results) => {
        try {
          setExperienceData(
            results.data
              .filter((row) => row.Type === "Experience" && row.Title)
              .map((row) => ({
                yearRange: row["Year Range"],
                title: row["Title"],
                company: row["Organization"],
                link: row["Link"],
                location: row["Location"],
                description: row["Description"],
                tags: row["Tags"] ? row["Tags"].split(/,\s*/) : [],
                details: row["Details"] ? row["Details"].split(" | ") : [],
              }))
          );
          setExperienceLoading(false);
        } catch (err) {
          setExperienceError("Failed to load experience data.");
          setExperienceLoading(false);
        }
        try {
          setProjectData(
            results.data
              .filter((row) => row.Type === "Project" && row.Title)
              .map((row) => {
                let image = row["Image"];
                return {
                  title: row["Title"],
                  description: row["Description"],
                  tags: row["Tags"] ? row["Tags"].split(/,\s*/) : [],
                  image,
                  link: row["Link"],
                };
              })
          );
          setProjectLoading(false);
        } catch (err) {
          setProjectError("Failed to load project data.");
          setProjectLoading(false);
        }
      },
      error: (err) => {
        setExperienceError("Failed to load experience/project data.");
        setExperienceLoading(false);
        setProjectError("Failed to load experience/project data.");
        setProjectLoading(false);
      },
    });
  }, []);

  async function sendMail(e) {
    e.preventDefault(); // Prevent the default form submission

    const formData = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all fields before sending!");
      return;
    }

    try {
      // Replace these with your EmailJS credentials
      const serviceId = "service_tirj05g";
      const templateId = "template_3bd0z5a";
      const userId = "bJTHMkGllaUZj-6c4";

      const emailParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };

      // Send the email
      const result = await emailjs.send(
        serviceId,
        templateId,
        emailParams,
        userId
      );

      if (result.status === 200) {
        alert(
          "Message sent successfully! 🎉 Check your email for confirmation. 😊"
        );

        // Clear the form after successful submission
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send your message. Please try again.");
    }
  }

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
        {certificationLoading ? (
          <div className="loading">Loading certifications...</div>
        ) : certificationError ? (
          <div className="error">{certificationError}</div>
        ) : certificationData.length === 0 ? (
          <div className="empty">No certification data found.</div>
        ) : (
          certificationData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))
        )}
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
          <button type="button" onClick={sendMail} className="rounded">
            Send
          </button>
        </form>
      </Section>
    </main>
  );
};

export default MainContent;
