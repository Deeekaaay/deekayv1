// src/context/DataContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import Papa from "papaparse";
import { GOOGLE_SHEETS_URLS } from "../config/constants";

const DataContext = createContext(null);

const CACHE_KEYS = {
  EXP_PROJECTS: "dkv1_exp_projects_cache",
  CERTIFICATIONS: "dkv1_cert_cache",
};

const readCache = (key) => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeCache = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Storage full or unavailable — silently skip
  }
};

const parseCsv = (url) =>
  new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(err),
    });
  });

export const DataProvider = ({ children }) => {
  const [experience, setExperience] = useState({
    data: [],
    loading: true,
    error: null,
  });
  const [projects, setProjects] = useState({
    data: [],
    loading: true,
    error: null,
  });
  const [certifications, setCertifications] = useState({
    data: [],
    loading: true,
    error: null,
  });

  // ─── Fetch experience + projects (single request) ─────────────────────────
  const fetchExperienceProjects = useCallback(async () => {
    const cached = readCache(CACHE_KEYS.EXP_PROJECTS);
    if (cached) {
      setExperience({ data: cached.experience, loading: false, error: null });
      setProjects({ data: cached.projects, loading: false, error: null });
      return;
    }

    try {
      const rows = await parseCsv(GOOGLE_SHEETS_URLS.EXPERIENCE_PROJECTS);

      const experienceData = rows
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

      const projectsData = rows
        .filter((row) => row.Type === "Project" && row.Title)
        .map((row) => ({
          title: row["Title"],
          description: row["Description"],
          tags: row["Tags"] ? row["Tags"].split(/,\s*/) : [],
          link: row["Link"],
        }));

      writeCache(CACHE_KEYS.EXP_PROJECTS, {
        experience: experienceData,
        projects: projectsData,
      });
      setExperience({ data: experienceData, loading: false, error: null });
      setProjects({ data: projectsData, loading: false, error: null });
    } catch {
      setExperience({
        data: [],
        loading: false,
        error: "Failed to load experience data.",
      });
      setProjects({
        data: [],
        loading: false,
        error: "Failed to load project data.",
      });
    }
  }, []);

  // ─── Fetch certifications ─────────────────────────────────────────────────
  const fetchCertifications = useCallback(async () => {
    const cached = readCache(CACHE_KEYS.CERTIFICATIONS);
    if (cached) {
      setCertifications({ data: cached, loading: false, error: null });
      return;
    }

    try {
      const rows = await parseCsv(GOOGLE_SHEETS_URLS.CERTIFICATIONS);
      const certs = rows
        .filter((row) => row.title)
        .map((row) => ({
          ...row,
          tags: row.tags ? row.tags.split(/,\s*/) : [],
        }));

      writeCache(CACHE_KEYS.CERTIFICATIONS, certs);
      setCertifications({ data: certs, loading: false, error: null });
    } catch {
      setCertifications({
        data: [],
        loading: false,
        error: "Failed to load certifications.",
      });
    }
  }, []);

  // ─── Auto-fetch on mount ──────────────────────────────────────────────────
  useEffect(() => {
    fetchExperienceProjects();
    fetchCertifications();
  }, [fetchExperienceProjects, fetchCertifications]);

  const value = {
    experience,
    projects,
    certifications,
    fetchCertifications, // exposed for manual refresh if needed
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
