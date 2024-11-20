// src/components/ProjectCard.js
import React from "react";
import "../styles/ProjectCard.css";

const ProjectCard = ({ title, description, tags, image, link, rating }) => {
  return (
    <div className="project-card">
      {image && (
        <div className="project-image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className="project-content">
        <div className="project-header">
          <h3>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {title} ↗
            </a>
          </h3>
        </div>
        <p>{description}</p>
        {rating && (
          <div className="project-rating">
            <span>★ {rating}</span>
          </div>
        )}
        {tags && (
          <ul className="project-tags">
            {tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
