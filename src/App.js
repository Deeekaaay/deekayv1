// src/App.js
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import CertificationsPage from "./pages/CertificationsPage";
import { trackVisitorSource } from "./utils/tracking";
import "./styles/App.css";
import "./styles/theme.css";

function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );

  useEffect(() => {
    document.body.classList.toggle("light-theme", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    trackVisitorSource();
  }, []);

  useEffect(() => {
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
  }, []);

  return (
    <div className="app">
      <button
        className="theme-toggle"
        onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        aria-label="Switch theme"
      >
        <i className="fi fi-rr-night-day social-icon-theme" />
      </button>

      <div className="custom-cursor" />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Sidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
              <MainContent
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </>
          }
        />
        <Route path="/certifications" element={<CertificationsPage />} />
      </Routes>
    </div>
  );
}

export default App;
