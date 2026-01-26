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

      // Handle different types
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

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <i className="fi fi-rr-sort sort-icon"></i>;
    }
    return sortConfig.direction === 'asc' 
      ? <i className="fi fi-rr-sort-amount-up-alt sort-icon active"></i>
      : <i className="fi fi-rr-sort-amount-down sort-icon active"></i>;
  };

  return (
    <div className="certifications-table-container">
      <table className="certifications-table">
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => handleSort('title')} className="sortable">
              Certificate <SortIcon columnKey="title" />
            </th>
            <th onClick={() => handleSort('org')} className="sortable">
              Issuer <SortIcon columnKey="org" />
            </th>
            <th onClick={() => handleSort('tags')} className="sortable">
              Skills <SortIcon columnKey="tags" />
            </th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {sortedCertifications.map((cert, index) => (
            <tr key={index}>
              <td className="cert-number">{index + 1}</td>
              <td className="cert-title">{cert.title}</td>
              <td className="cert-issuer">{cert.org || "N/A"}</td>
              <td className="cert-tags">
                <TagList tags={cert.tags} />
              </td>
              <td className="cert-link">
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-cert-link"
                  >
                    View <i className="fi fi-rr-arrow-up-right-from-square"></i>
                  </a>
                ) : (
                  <span className="text-muted">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CertificationsTable;
