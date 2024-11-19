// src/components/MainContent.js
import React from "react";
import { useEffect } from "react";
import "../styles/MainContent.css";
import ExperienceCard from "./ExperienceCard";
import ProjectCard from "./ProjectCard";

const MainContent = () => {
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.querySelector(".about-section");
      const paragraphs = aboutSection.querySelectorAll("p");

      paragraphs.forEach((p, index) => {
        const position = p.getBoundingClientRect();
        if (position.top < window.innerHeight) {
          setTimeout(() => p.classList.add("visible"), index * 100);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const experienceData = [
    {
      yearRange: "2024 — Present",
      title: "Senior Frontend Engineer, Accessibility",
      company: "Klaviyo",
      description:
        "Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
      tags: ["JavaScript", "TypeScript", "React", "Storybook"],
      link: "https://www.klaviyo.com",
    },
    {
      yearRange: "2024 — Present",
      title: "Senior Frontend Engineer, Accessibility",
      company: "Klaviyo",
      description:
        "Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
      tags: ["JavaScript", "TypeScript", "React", "Storybook"],
      link: "https://www.klaviyo.com",
    },
  ];
  return (
    <main className="content">
      <section id="about" className="about-section">
        <div className="about-intro">
          <p>
            From curious beginnings to innovative solutions, my journey as a
            Full-Stack Developer has been a tapestry of challenges and
            discoveries.
          </p>
        </div>

        <div className="about-content">
          <article>
            <p>
              It all started with a{" "}
              <strong>Bachelor's in Electronics & Communication</strong>, where
              I was captivated by the intricacies of technology. This academic
              foundation ignited a passion to bridge hardware and software,
              leading me to the dynamic world of software development.
            </p>
            <p>
              Embracing the ever-evolving tech landscape, I immersed myself in{" "}
              <strong>React.js</strong>,<strong> Node.js</strong> and{" "}
              <strong>GoLang</strong>, crafting responsive and efficient web
              applications. One standout project was an assessment application
              that <strong>boosted evaluation accuracy by 25%</strong>,
              underscoring my commitment to delivering impactful solutions.
            </p>
          </article>

          <article>
            <p>
              Currently, I'm pursuing a{" "}
              <strong>Master's in Information Technology</strong> at RMIT
              University, focusing on <strong>Full-Stack Development</strong>,{" "}
              <strong>Data Visualization</strong>, and{" "}
              <strong>Cloud Computing</strong>. This academic endeavor keeps me
              at the forefront of emerging technologies, ensuring I stay ahead
              in this fast-paced industry.
            </p>
            <p>
              Beyond coding, I thrive on <strong>collaboration</strong> and{" "}
              <strong>continuous learning</strong>. I believe that the fusion of
              diverse ideas leads to groundbreaking solutions. Whether it's
              brainstorming with a team or diving into the latest tech trends,
              I'm always eager to expand my horizons and contribute meaningfully
              to the tech community.
            </p>
          </article>
        </div>
      </section>

      <section id="experience">
        {experienceData.map((experience, index) => (
          <ExperienceCard key={index} {...experience} />
        ))}
      </section>
      <section id="projects">
        <ProjectCard
          title="Build a Spotify Connected App"
          description="A video course teaching how to build a web app with the Spotify Web API."
          tags={["React", "Express", "Spotify API"]}
        />
      </section>
    </main>
  );
};

export default MainContent;
