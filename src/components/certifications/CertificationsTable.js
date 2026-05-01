// src/components/certifications/CertificationsTable.js
import React, { useState, useMemo } from "react";
import TagList from "../TagList";
import "../../styles/CertificationsTable.css";

const CertificationsTable = ({ certifications }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCertifications = useMemo(() => {
    if (!certifications || certifications.length === 0) return [];
    if (!sortConfig.key) return certifications;

    return [...certifications].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'tags') {
        aValue = a.tags?.join(',') || '';
        bValue = b.tags?.join(',') || '';
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [certifications, sortConfig]);

  if (!certifications || certifications.length === 0) {
    return <p className="text-muted">No additional certifications to display.</p>;
  }

  return (
    <div className="certifications-list-container">
      {/* Optional: Add a sorting dropdown/bar here if sorting is highly requested, 
          but for now we default to the order from Google Sheets (usually chronological) */}
      <div className="certifications-grid">
        {sortedCertifications.map((cert, index) => (
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
