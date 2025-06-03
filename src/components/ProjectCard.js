import "../styles/ProjectCard.css";
import TagList from "./TagList";

const ProjectCard = ({ title, description, tags, image, link, rating }) => {
  return (
    <div className="project-card flex rounded shadow card-spacing">
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
