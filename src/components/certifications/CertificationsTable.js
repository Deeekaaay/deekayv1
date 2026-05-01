// src/components/certifications/CertificationsTable.js
import React from "react";
import TagList from "../TagList";
import "../../styles/CertificationsTable.css";

const CertificationsTable = ({ certifications }) => {
  if (!certifications || certifications.length === 0) {
    return <p className="text-muted">No additional certifications to display.</p>;
  }

  return (
    <div className="certifications-list-container">
      {/* Optional: Add a sorting dropdown/bar here if sorting is highly requested, 
          but for now we default to the order from Google Sheets (usually chronological) */}
      <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <div key={index} className="certification-card">
            <div className="cert-card-header">
              <h3 className="cert-title">{cert.title}</h3>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-cert-link"
                  aria-label={`View ${cert.title} certificate`}
                >
                  <i className="fi fi-rr-arrow-up-right-from-square"></i>
                </a>
              )}
            </div>
            
            <p className="cert-issuer text-muted">
              {cert.org || "N/A"}
            </p>
            
            {cert.tags && cert.tags.length > 0 && (
              <div className="cert-tags mt-4">
                <TagList tags={cert.tags} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsTable;
