// src/components/certifications/CertificationsSection.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CertificationCard from "./CertificationCard";
import useCertifications from "../../hooks/useCertifications";
import { FEATURED_CERTIFICATIONS_COUNT } from "../../config/constants";

const CertificationsSection = () => {
  const { data: certifications, loading, error } = useCertifications();
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Track window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return <div className="loading">Loading certifications...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (certifications.length === 0) {
    return <div className="empty">No certification data found.</div>;
  }

  // Determine which certifications to show
  const displayedCerts = showAll 
    ? certifications 
    : certifications.slice(0, FEATURED_CERTIFICATIONS_COUNT);
  const totalCerts = certifications.length;
  const hasMore = totalCerts > FEATURED_CERTIFICATIONS_COUNT;

  const handleViewMore = (e) => {
    if (isMobile) {
      // On mobile, expand the section
      e.preventDefault();
      setShowAll(!showAll);
    }
    // On desktop, let the Link navigate naturally
  };

  return (
    <div className="certifications-section">
      {/* Certifications as Cards */}
      {displayedCerts.map((cert, index) => (
        <CertificationCard key={index} {...cert} />
      ))}

      {/* View All/Less Button */}
      {hasMore && (
        <div className="view-all-section">
          {isMobile ? (
            <button onClick={handleViewMore} className="view-all-link">
              {showAll ? "Show Less" : "View All Certifications"}
            </button>
          ) : (
            <Link to="/certifications" className="view-all-link">
              View Full Certification Archive
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificationsSection;
