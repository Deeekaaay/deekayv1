// src/App.js
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import MainContent from "./components/layout/MainContent";
import CertificationsPage from "./pages/CertificationsPage";
import BackgroundOverlay from "./components/background/BackgroundOverlay";
import MobileNav from "./components/layout/MobileNav";
import { trackVisitorSource } from "./utils/tracking";
import ResumeDownload from "./pages/ResumeDownload";
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
    <>
      <BackgroundOverlay />
      <div className="app" style={{ position: "relative", zIndex: 1 }}>
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
                <MobileNav activeSection={activeSection} />
              </>
            }
          />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/resume" element={<ResumeDownload />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
