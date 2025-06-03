// src/components/TagList.js
import React from "react";

/**
 * Reusable tag list component for displaying tags as a list of styled items.
 * @param {Object} props
 * @param {string[]} props.tags - Array of tag strings
 */
const TagList = ({ tags }) => {
  if (!tags || !tags.length) return null;
  return (
    <ul className="project-tags">
      {tags.map((tag, idx) => (
        <li key={idx}>{tag}</li>
      ))}
    </ul>
  );
};

export default TagList;
