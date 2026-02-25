import React, { useRef, useEffect } from "react";
import "../styles/ProjectCard.css";
import TagList from "./TagList";

const ProjectCard = ({
  title,
  description,
  tags,
  link,
  index = 0,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
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
      { threshold: 0.01, rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card flex rounded shadow card-spacing"
    >
      <div className="project-content">
        <div className="project-header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "var(--spacing-small)",
            }}
          >
            <h3 style={{ margin: 0 }}>
              <a
                className="text-primary"
                href={link ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {title} ↗
              </a>
            </h3>
            {tags && tags.length > 5 && (
              <span className="featured-badge">Featured</span>
            )}
          </div>
        </div>
        <p className="text-muted">{description}</p>
        <TagList tags={tags} />
      </div>
    </div>
  );
};

export default ProjectCard;
