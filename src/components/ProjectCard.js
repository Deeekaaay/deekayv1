// src/components/ProjectCard.js
import React from 'react';
import '../styles/ProjectCard.css';

const ProjectCard = ({ title, description, tags }) => {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <ul className="tags">
        {tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectCard;
