// src/hooks/useCertifications.js
import { useEffect } from "react";
import { useData } from "../context/DataContext";

/**
 * Custom hook to access certification data from global context
 * Automatically triggers fetch if data is missing
 * @returns {Object} { data, loading, error }
 */
const useCertifications = () => {
  const { certifications, fetchCertifications } = useData();

  useEffect(() => {
    // If data is empty and not loading, try to fetch (fallback safety)
    if (certifications.data.length === 0 && !certifications.loading && !certifications.error) {
      fetchCertifications();
    }
  }, [certifications, fetchCertifications]);

  return certifications;
};

export default useCertifications;

