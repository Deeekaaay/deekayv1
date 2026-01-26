// src/hooks/useExperience.js
import { useState, useEffect } from "react";
import Papa from "papaparse";
import { GOOGLE_SHEETS_URLS } from "../config/constants";

/**
 * Custom hook to fetch and manage experience data from Google Sheets
 * @returns {Object} { data, loading, error }
 */
const useExperience = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = () => {
      setLoading(true);
      setError(null);

      Papa.parse(GOOGLE_SHEETS_URLS.EXPERIENCE_PROJECTS, {
        download: true,
        header: true,
        complete: (results) => {
          try {
            const experience = results.data
              .filter((row) => row.Type === "Experience" && row.Title)
              .map((row) => ({
                yearRange: row["Year Range"],
                title: row["Title"],
                company: row["Organization"],
                link: row["Link"],
                location: row["Location"],
                description: row["Description"],
                tags: row["Tags"] ? row["Tags"].split(/,\s*/) : [],
                details: row["Details"] ? row["Details"].split(" | ") : [],
              }));

            setData(experience);
            setLoading(false);
          } catch (err) {
            setError("Failed to load experience data.");
            setLoading(false);
          }
        },
        error: (err) => {
          setError("Failed to load experience data.");
          setLoading(false);
        },
      });
    };

    fetchExperience();
  }, []);

  return { data, loading, error };
};

export default useExperience;
