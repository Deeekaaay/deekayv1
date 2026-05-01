// src/components/certifications/CertificationCard.js
import React, { useEffect, useRef } from "react";
import TagList from "../TagList";
import "../../styles/ProjectCard.css"; // Reuse ProjectCard styles

const CertificationCard = ({ title, description, image, tags, link, org }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    // Clear any existing delays
    card.style.animationDelay = null;
    card.style.transitionDelay = null;
    
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            card.classList.add("animated");
          } else {
            card.classList.remove("animated");
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -20% 0px" }
    );
    
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="project-card flex rounded shadow card-spacing">
      {/* Image on the left - matching ProjectCard */}
      <div className="project-image cert-image">
        {image && (
          <img
            className="rounded"
            src={image}
            alt={title}
            loading="lazy"
          />
        )}
      </div>

      {/* Content on the right - matching ProjectCard */}
      <div className="project-content">
        <div className="project-header">
          <h3>
            <a 
              className="text-primary"
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {title} ↗
            </a>
          </h3>
        </div>
        {description && <p className="text-muted">{description}</p>}
        <TagList tags={tags} />
      </div>
    </div>
  );
};

export default CertificationCard;
