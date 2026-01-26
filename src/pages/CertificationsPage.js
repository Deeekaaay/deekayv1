// src/pages/CertificationsPage.js
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import CertificationsTable from "../components/certifications/CertificationsTable";
import useCertifications from "../hooks/useCertifications";
import "../styles/CertificationsPage.css";

const CertificationsPage = () => {
  const { data: certifications, loading, error } = useCertifications();

  // Extract unique providers from certifications data
  const providers = useMemo(() => {
    if (!certifications || certifications.length === 0) return [];
    
    const uniqueProviders = new Map();
    certifications.forEach(cert => {
      if (cert.org && cert.image && !uniqueProviders.has(cert.org)) {
        uniqueProviders.set(cert.org, {
          name: cert.org,
          logo: cert.image
        });
      }
    });
    
    return Array.from(uniqueProviders.values()); // Show all unique providers
  }, [certifications]);

  return (
    <div className="certifications-page">
      <div className="certifications-page-header">
        <Link to="/" className="back-link">
          Back to Home
        </Link>
        
        {/* Provider Logos Carousel */}
        {providers.length > 0 && (
          <div className="providers-arc">
            <div>
              {/* Duplicate providers for seamless infinite scroll */}
              {[...providers, ...providers].map((provider, index) => (
                <div 
                  key={`${provider.name}-${index}`} 
                  className="provider-logo-wrapper"
                >
                  <img 
                    src={provider.logo} 
                    alt={provider.name}
                    className="provider-logo"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <h1 className="page-title">All Certifications</h1>
      </div>

        {loading ? (
          <div className="loading">Loading certifications...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : certifications.length === 0 ? (
          <div className="empty">No certification data found.</div>
        ) : (
          <>
            <CertificationsTable certifications={certifications} />
          </>
        )}
    </div>
  );
};

export default CertificationsPage;
