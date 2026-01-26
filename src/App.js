import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import CertificationsPage from "./pages/CertificationsPage";
import Loader from "./components/Loader";
import { trackVisitorSource } from "./utils/tracking";
import { useData } from "./context/DataContext";
import "./styles/App.css";
import "./styles/theme.css";
import "./styles/Loader.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const { fetchCertifications } = useData();
  const [theme, setTheme] = useState(() => {
    // Check localStorage or default to dark
    return localStorage.getItem("theme") || "dark";
  });
  const [themeClicked, setThemeClicked] = useState(false);

  // Handle loader completion
  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  // Preload data function for Loader
  const preloadData = React.useCallback(async () => {
    // Actual data fetching
    try {
      await fetchCertifications();
    } catch (error) {
      console.error("Failed to preload data:", error);
    }
  }, [fetchCertifications]);

  useEffect(() => {
    document.body.classList.toggle("light-theme", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Track visitor source and send Telegram notification (optional)
  useEffect(() => {
    trackVisitorSource();
  }, []);

  // Custom cursor effect
  useEffect(() => {
    if (isLoading) return;
    
    const cursor = document.querySelector(".custom-cursor");
    if (!cursor) return;
    
    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    
    document.addEventListener("mousemove", moveCursor);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, [isLoading]);

  // Show loader if loading
  if (isLoading) {
    return <Loader onLoadComplete={handleLoadComplete} dataLoader={preloadData} />;
  }

  return (
    <div className="app">
      <a
        href="#main-content"
        className="skip-link"
        style={{
          position: "absolute",
          top: "-40px",
          left: 0,
          background: "#000",
          color: "#fff",
          padding: "8px",
          zIndex: 100,
        }}
      >
        Skip to content
      </a>
      
      {/* Theme Toggle Button - retained from original */}
      <a
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
          setThemeClicked(true);
        }}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 10000,
          padding: "8px 16px",
          borderRadius: 6,
          border: "none",
          background: "none",
          cursor: "pointer",
        }}
        aria-label="Switch theme"
      >
        <i
          className={`fi fi-rr-night-day social-icon-theme${
            themeClicked ? " clicked" : ""
          }`}
        />
      </a>

      <div className="custom-cursor" />

      <Routes>
        {/* Main Route - Home Page */}
        <Route
          path="/"
          element={
            <>
              <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
              <MainContent activeSection={activeSection} onSectionChange={setActiveSection} />
            </>
          }
        />
        {/* Certifications Route */}
        <Route path="/certifications" element={<CertificationsPage />} />
      </Routes>
    </div>
  );
}

export default App;
