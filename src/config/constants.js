// src/config/constants.js
// Central location for all app constants and configuration

// Google Sheets CSV URLs
export const GOOGLE_SHEETS_URLS = {
  CERTIFICATIONS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdCHB-aGuhU0G6641f5IvhB4lKtKZnY9-wqtiVdNGo1fzB7SYeA7_1WoZtRRG2Z3CiPsYf55n_CQ1A/pub?output=csv",
  EXPERIENCE_PROJECTS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdCHB-aGuhU0G6641f5IvhB4lKtKZnY9-wqtiVdNGo1fzB7SYeA7_1WoZtRRG2Z3CiPsYf55n_CQ1A/pub?gid=485602198&single=true&output=csv",
};

// Theme settings
export const THEME = {
  DEFAULT: "dark",
  LIGHT: "light",
  DARK: "dark",
};

// Intersection Observer options for section detection
export const SECTION_OBSERVER_OPTIONS = {
  threshold: 0.05,
};

// App metadata
export const APP_INFO = {
  NAME: "deekayv1",
  VERSION: "0.1.0",
  AUTHOR: "Dinesh Suresh",
  HOMEPAGE: "https://dineshsuresh.com/",
};

// Number of featured certifications to display before "View More"
export const FEATURED_CERTIFICATIONS_COUNT = 4;
