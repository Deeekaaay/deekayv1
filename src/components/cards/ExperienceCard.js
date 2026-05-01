import React, { useRef, useEffect } from "react";
import "./ExperienceCard.css";
import TagList from "../ui/TagList";

const ExperienceCard = ({
  yearRange,
  title,
  company,
  description,
  tags,
  link,
  details,
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
    <div ref={cardRef} className="experience-card rounded shadow card-spacing">
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
      <div className="experience-body">
        <p className="text-muted">{description}</p>
        <TagList tags={tags} />
        {details && (
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
