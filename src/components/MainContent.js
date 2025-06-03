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

  useEffect(() => {
    const handleSectionChange = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id); // Update the active section
          onSectionChange(entry.target.id); // Notify the parent of the active section
        }
      });
    };

    const options = {
      threshold: 0.2, // 20% of the section must be visible
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
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (results) => {
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
      },
    });
  }, []);

  useEffect(() => {
    // Fetch Experience and Project Data from Google Sheets CSV
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdCHB-aGuhU0G6641f5IvhB4lKtKZnY9-wqtiVdNGo1fzB7SYeA7_1WoZtRRG2Z3CiPsYf55n_CQ1A/pub?gid=485602198&single=true&output=csv";
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (results) => {
        // Experience Data
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
        // Project Data
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
            From curious beginnings to innovative tech solutions, my journey as
            a Full-Stack Software Engineer in Australia has been shaped by a
            passion for solving real-world problems through scalable and modern
            web technologies.
          </p>
        </div>
        <div className="about-content">
          <article>
            <p>
              It all began with a{" "}
              <strong>
                Bachelor’s in Electronics & Communication Engineering
              </strong>
              , where I developed a strong foundation in computing and systems
              thinking. This ignited my interest in bridging the gap between
              hardware and software, eventually guiding me into the dynamic
              world of full-stack development.
            </p>
            <p>
              Over the years, I’ve built and deployed high-performance
              applications using <strong>React.js</strong>,{" "}
              <strong>Typescript</strong>, <strong>Node.js</strong>,{" "}
              <strong>GoLang</strong>, and <strong>Python</strong>. One of my
              proudest achievements was leading the development of an assessment
              platform that{" "}
              <strong>increased evaluation accuracy by 25%</strong>, showcasing
              my ability to deliver real business impact.
            </p>
          </article>

          <article>
            <p>
              I’m currently advancing my skills through a{" "}
              <strong>Master’s in Information Technology</strong> at{" "}
              <strong>RMIT University (Melbourne)</strong>, specialising in{" "}
              <strong>Full-Stack Software Development</strong>,{" "}
              <strong>Data Visualization</strong>, and <strong>DevOps</strong>.
              This academic journey helps me stay current with emerging
              technologies in Australia’s growing tech ecosystem.
            </p>
            <p>
              Outside of writing code, I’m deeply passionate about{" "}
              <strong>collaboration</strong>, <strong>DevOps culture</strong>,
              and <strong>continuous learning</strong>. I believe in building
              products that are user-centric, secure, and maintainable. Whether
              it’s working within cross-functional teams or contributing to
              innovative side projects, I aim to grow as a tech professional and
              make a meaningful contribution to Australia’s digital future.
            </p>
          </article>
        </div>
      </Section>
      <Section id="experience" title="Experience" activeSection={activeSection}>
        {experienceData.map((experience, index) => (
          <ExperienceCard key={index} {...experience} />
        ))}
      </Section>
      <Section id="projects" title="Projects" activeSection={activeSection}>
        {projectData.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </Section>
      <Section
        id="certifications"
        title="Certifications"
        activeSection={activeSection}
      >
        {certificationData.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </Section>
      <Section id="contact" title="Contact" activeSection={activeSection}>
        <p className="text-muted">
          💡 "Got a genius project idea? Or just want to chat about life, code,
          or your favorite anime? 🎥✨ Drop me a message below, and I promise to
          respond faster than Goku can go Super Saiyan! 🚀
        </p>
        <form
          id="contact-form"
          className="flex flex-col gap-2 p-medium bg-background rounded shadow"
        >
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
