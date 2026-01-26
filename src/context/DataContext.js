// src/context/DataContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import Papa from "papaparse";
import { GOOGLE_SHEETS_URLS } from "../config/constants";

// Create context
const DataContext = createContext(null);

// Provider Component
export const DataProvider = ({ children }) => {
  const [certifications, setCertifications] = useState({ data: [], loading: true, error: null });
  // Add other data states here as needed (projects, experience, etc.)

  const fetchCertifications = useCallback(() => {
    return new Promise((resolve, reject) => {
      setCertifications(prev => ({ ...prev, loading: true }));
      
      Papa.parse(GOOGLE_SHEETS_URLS.CERTIFICATIONS, {
        download: true,
        header: true,
        complete: (results) => {
          try {
            const certs = results.data
              .filter((row) => row.title)
              .map((row) => ({
                ...row,
                image: row.image,
                tags: row.tags ? row.tags.split(/,\s*/) : [],
              }));

            setCertifications({ data: certs, loading: false, error: null });
            resolve(certs);
          } catch (err) {
            setCertifications({ data: [], loading: false, error: "Failed to parse data" });
            reject(err);
          }
        },
        error: (err) => {
          setCertifications({ data: [], loading: false, error: "Failed to load certifications" });
          reject(err);
        },
      });
    });
  }, []);

  const value = {
    certifications,
    fetchCertifications
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use data context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
