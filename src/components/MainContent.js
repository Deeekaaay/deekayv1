// src/components/MainContent.js
import React, { useEffect } from "react";
import "../styles/MainContent.css";
import ExperienceCard from "./ExperienceCard";
import ProjectCard from "./ProjectCard";
import emailjs from "@emailjs/browser";

const MainContent = ({ onSectionChange }) => {
  useEffect(() => {
    const handleSectionChange = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onSectionChange(entry.target.id); // Notify the parent of the active section
        }
      });
    };

    const options = {
      threshold: 0.3, // 30% of the section must be visible
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
  const experienceData = [
    {
      yearRange: "Nov 2024 – Present",
      title: "Software Engineer | Internship",
      company: "AquaTerra",
      link: "https://aqua-terra.com.au/",
      location: "Carlton, Victoria, Australia",
      description:
        "Leading the restructuring of AquaTerra's IoT application with AWS, React.js, and Node.js. Delivering scalable, secure solutions while enhancing real-time analytics and user engagement for sustainable agriculture.",
      tags: [
        "AWS",
        "React.js",
        "Node.js",
        "AWSIoT",
        "Postgresql",
        "Dashboards",
        "Real-Time Alerts",
      ],
      details: [
        "Redesigned the application architecture to improve performance, scalability, and maintainability.",
        "Developed real-time alerts, customizable dashboards, and advanced analytics to enhance user engagement.",
        "Integrated secure IoT protocols for seamless device communication.",
        "Collaborated with engineers, data scientists, and product managers to align technical solutions with business objectives.",
        "Deployed encryption and authentication protocols to safeguard sensitive data.",
        "Enabled actionable insights that empowered farmers to adopt sustainable practices.",
      ],
    },
    {
      yearRange: "Aug 2023 – Feb 2024",
      title: "Software Engineer | Backend Specialist",
      company: "Avasoft",
      link: "http://www.avasoft.com",
      location: "Chennai, Tamil Nadu, India",
      description:
        "Spearheaded the development of a cutting-edge assessment platform using TypeScript, GoLang, and MSSQL. Improved accuracy and efficiency with robust APIs and agile processes.",
      tags: [
        "TypeScript",
        "GoLang",
        "MSSQL",
        "MongoDB",
        "Okta",
        "Azure",
        "SonarCloud",
      ],
      details: [
        "Achieved a 25% improvement in assessment accuracy with actionable insights from analytics.",
        "Integrated APIs like Okta, Azure, and SonarCloud for seamless functionality.",
        "Enhanced backend performance through rigorous code reviews and modular architecture.",
        "Collaborated with cross-functional teams to align technical solutions with business goals.",
        "Adhered to Agile methodologies and the 4D process (Define, Design, Develop, Deploy) to ensure timely delivery.",
        "Documented pseudocode mapped to implementation for improved code clarity and maintainability.",
      ],
    },
    {
      yearRange: "Dec 2022 – Aug 2023",
      title: "Software Engineer",
      company: "Avasoft",
      link: "http://www.avasoft.com",
      location: "Chennai, Tamil Nadu, India",
      description:
        "Engineered a scalable logistics platform using PHP Symfony, Go, and jQuery, delivering new features and improving operational efficiency for global supply chains.",
      tags: ["PHP Symfony", "GoLang", "jQuery", "HTML.Twig", "Unit Testing"],
      details: [
        "Designed and implemented new modular services to meet client requirements.",
        "Improved system scalability and maintainability by integrating complex systems into streamlined architecture.",
        "Collaborated with cross-functional teams to align technical deliverables with business goals.",
        "Conducted rigorous unit testing to ensure reliability and functionality.",
        "Enhanced client engagement through personalized, scalable solutions.",
      ],
    },
    {
      yearRange: "Aug 2022 – Dec 2022",
      title: "Software Engineer Intern",
      company: "Avasoft",
      link: "http://www.avasoft.com",
      location: "Chennai, Tamil Nadu, India",
      description:
        "Contributed to full-stack development with React.js, Node.js, and MySQL. Played a critical role in feature development and testing under senior guidance.",
      tags: ["React.js", "Node.js", "MySQL"],
      details: [
        "Developed and tested front-end and back-end features for a web application.",
        "Collaborated with senior developers during team meetings, code reviews, and brainstorming sessions.",
        "Assisted in debugging and unit testing to ensure code quality.",
        "Learned best practices in full-stack development, earning a full-time Software Engineer position.",
      ],
    },
    {
      yearRange: "Jan 2022 – Apr 2022",
      title: "Web App Developer | Volunteer",
      company: "SAEC | S.A. Engineering College",
      location: "Chennai, Tamil Nadu, India",
      link: "https://www.saec.ac.in/",
      description:
        "Developed a responsive invitation website for EMTEEC 2022, enabling seamless participant registration and effective information dissemination.",
      tags: ["HTML5", "CSS3", "JavaScript", "Netlify"],
      details: [
        "Created intuitive navigation menus for effortless user interaction.",
        "Designed and implemented responsive layouts for cross-device compatibility.",
        "Collaborated with organizers to ensure branding and design objectives were met.",
        "Successfully facilitated participant registrations and boosted event outreach.",
      ],
    },
  ];
  const projectData = [
    {
      title: "EMTEEC 2022 Invitation Website",
      description:
        "Created a responsive invitation website for EMTEEC 2022 using HTML5, CSS3, and JavaScript. Delivered user-friendly navigation, device compatibility, and efficient registration, collaborating with organizers to ensure seamless information sharing.",
      tags: ["HTML5", "CSS3", "JavaScript", "Netlify"],
      image: "images/emteec.png",
      link: "https://emteecwhite.netlify.app/",
    },
  ];
  const certificationData = [
    {
      title: "Innovation for Global Cities",
      description:
        "This credential earner demonstrates the ability to identify innovation strategies, apply them to global issues, and navigate complex environments with diverse stakeholders and competing demands.",
      tags: [
        "Decision Making",
        "Presentation Skills",
        "Problem Solving",
        "Research And Analysis",
        "Teamwork",
      ],
      image: "images/innovation-for-global-cities.2.png",
      link: "https://www.credly.com/badges/837c9dbf-fa77-4fe4-bd62-8e41dadd3d4e/public_url",
    },
    {
      title: "Womin Djeka Indigenous Orientation",
      description:
        "Earners of Womin Djeka Indigenous Orientation demonstrate awareness of Aboriginal and Torres Strait Islander cultures, commit to Dhumbah Goorowa, and value First Nations' self-determination as custodians of this land.",
      tags: [
        "Cultural And Civic Awareness",
        "Indigenous Awareness And understAnding",
        "Reflecting",
      ],
      image: "images/womin-djeka-indigenous-orientation.png",
      link: "https://www.credly.com/badges/45217a8f-a0fc-4e5e-a803-31f742849372/public_url",
    },
    {
      title: "ChatGPT for Project Managers: 10x Your Productivity with AI",
      description:
        "Learn how to streamline project management with ChatGPT. Jean Kang shares tips on planning, risk management, tailored communication, and tracking progress to enhance efficiency and make data-driven decisions.",
      tags: [
        "Project Management",
        "Artificial Intelligence for Business",
        "ChatGPT",
        "Prompt Engineering",
      ],
      image: "images/linkedin_logo.jpg",
      link: "https://www.linkedin.com/learning/certificates/80928a5eee66b99e7ee781f2bb5bd9da54dc8d076d5859fe7485cb04912d0cb7",
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
        {projectData.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </section>
      <section id="certifications">
        {certificationData.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </section>
      <section id="contact">
        <p>
          💡 "Got a genius project idea? Or just want to chat about life, code,
          or your favorite anime? 🎥✨ Drop me a message below, and I promise to
          respond faster than Goku can go Super Saiyan! 🚀
        </p>
        <form id="contact-form">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            required
          />

          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Your Message"
            required
          ></textarea>

          <button type="button" onClick={sendMail}>
            Send
          </button>
        </form>
      </section>
    </main>
  );
};

export default MainContent;
