// src/components/ExperienceCard.js
import React, { useState } from "react";
import "../styles/ExperienceCard.css";

const ExperienceCard = ({
  yearRange,
  title,
  company,
  description,
  tags,
  link,
  details,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`experience-card ${isExpanded ? "expanded" : ""}`}>
      <div className="experience-header">
        <p>{yearRange}</p>
        <h3>
          {title} ·{" "}
          <a href={link ?? "#"} target="_blank">
            {company} <span>&#8599;</span>
          </a>
        </h3>
      </div>
      <div className="experience-body" onClick={toggleExpand}>
        <p>{description}</p>
        <ul className="experience-tags">
          {tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
        {isExpanded && (
          <div className="experience-details">
            <ul>
              {details.map((detail, index) => (
                <li key={index}>
                  {" "}
                  <span>&#187;</span> {detail}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
