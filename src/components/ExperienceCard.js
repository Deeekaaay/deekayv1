import React, { useState } from "react";
import "../styles/ExperienceCard.css";
import TagList from "./TagList";

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
    <div
      className={`experience-card rounded shadow card-spacing${
        isExpanded ? " expanded" : ""
      }`}
    >
      <div className="experience-header">
        <p className="text-muted">{yearRange}</p>
        <h3>
          {title} ·{" "}
          <a
            className="text-primary"
            href={link ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {company} <span>&#8599;</span>
          </a>
        </h3>
      </div>
      <div className="experience-body" onClick={toggleExpand}>
        <p className="text-muted">{description}</p>
        <TagList tags={tags} />
        {isExpanded && details && (
          <div className="experience-details">
            <ul className="list-none p-0">
              {details.map((detail, idx) => (
                <li key={idx}>
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
