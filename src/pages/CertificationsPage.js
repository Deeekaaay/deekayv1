// src/pages/CertificationsPage.js
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CertificationsTable from "../components/certifications/CertificationsTable";
import useCertifications from "../hooks/useCertifications";
import "./CertificationsPage.css";

const CertificationsPage = () => {
  const { data: certifications, loading, error } = useCertifications();

  // Extract unique providers from certifications data
  const providers = useMemo(() => {
    if (!certifications || certifications.length === 0) return [];

    const uniqueProviders = new Map();
    certifications.forEach((cert) => {
      if (cert.org && cert.image && !uniqueProviders.has(cert.org)) {
        uniqueProviders.set(cert.org, {
          name: cert.org,
          logo: cert.image,
        });
      }
    });

    return Array.from(uniqueProviders.values()); // Show all unique providers
  }, [certifications]);

  return (
    <div className="certifications-page">
      <Helmet>
        <title>Certifications — Dineshkumar Suresh | Software Engineer Melbourne</title>
        <meta
          name="description"
          content="Full archive of professional certifications earned by Dineshkumar Suresh — AWS, TypeScript, React, Go, DevOps, Cloud Computing, and more. Melbourne-based Full Stack Engineer."
        />
        <link rel="canonical" href="https://dineshsuresh.com/certifications" />
        <meta property="og:title" content="Certifications — Dineshkumar Suresh" />
        <meta property="og:url" content="https://dineshsuresh.com/certifications" />
        <meta property="og:description" content="Professional certifications by Dineshkumar Suresh — AWS, TypeScript, React, Go, DevOps, and Cloud Computing." />
      </Helmet>
      <div className="certifications-page-header">
        <Link to="/" className="back-link">
          Back to Home
        </Link>

        <h1 className="page-title">Certification Archive</h1>
        <p className="page-subtitle">
          A comprehensive record of my professional certifications, continuous
          learning, and technical upskilling.
        </p>

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
