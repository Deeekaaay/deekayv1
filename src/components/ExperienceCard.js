// src/components/ExperienceCard.js
import React from "react";
import "../styles/ExperienceCard.css";

const ExperienceCard = ({
  yearRange,
  title,
  company,
  description,
  tags,
  link,
}) => {
  return (
    <div className="experience-card">
      <div className="experience-header">
        <p>{yearRange}</p>
        <h3>
          {title} · <span>{company}</span>{" "}
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer">
              ↗
            </a>
          )}
        </h3>
      </div>
      <div className="experience-body">
        <p>{description}</p>
        <ul className="experience-tags">
          {tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceCard;
