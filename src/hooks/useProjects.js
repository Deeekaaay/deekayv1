// src/hooks/useProjects.js
import { useState, useEffect } from "react";
import Papa from "papaparse";
import { GOOGLE_SHEETS_URLS } from "../config/constants";

/**
 * Custom hook to fetch and manage project data from Google Sheets
 * @returns {Object} { data, loading, error }
 */
const useProjects = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = () => {
      setLoading(true);
      setError(null);

      Papa.parse(GOOGLE_SHEETS_URLS.EXPERIENCE_PROJECTS, {
        download: true,
        header: true,
        complete: (results) => {
          try {
            const projects = results.data
              .filter((row) => row.Type === "Project" && row.Title)
              .map((row) => {
                let image = row["Image"];
                return {
                  title: row["Title"],
                  description: row["Description"],
                  tags: row["Tags"] ? row["Tags"].split(/,\s*/) : [],
                  image,
                  link: row["Link"],
                };
              });

            setData(projects);
            setLoading(false);
          } catch (err) {
            setError("Failed to load project data.");
            setLoading(false);
          }
        },
        error: (err) => {
          setError("Failed to load project data.");
          setLoading(false);
        },
      });
    };

    fetchProjects();
  }, []);

  return { data, loading, error };
};

export default useProjects;
