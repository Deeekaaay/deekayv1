import React, { useRef, useEffect } from "react";
import "../styles/ProjectCard.css";
import TagList from "./TagList";

const ProjectCard = ({
  title,
  description,
  tags,
  image,
  link,
  rating,
  index = 0,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
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
    <div
      ref={cardRef}
      className="project-card flex rounded shadow card-spacing"
    >
      {image && (
        <div className="project-image">
          <img className="rounded" src={image} alt={title} />
        </div>
      )}
      <div className="project-content">
        <div className="project-header">
          <h3>
            <a
              className="text-primary"
              href={link ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title} ↗
            </a>
          </h3>
        </div>
        <p className="text-muted">{description}</p>
        {rating && (
          <div className="project-rating">
            <span>★ {rating}</span>
          </div>
        )}
        <TagList tags={tags} />
      </div>
    </div>
  );
};

export default ProjectCard;
