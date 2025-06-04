// src/App.js
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import "./styles/App.css";
import "./styles/theme.css";

function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [theme, setTheme] = useState(() => {
    // Check localStorage or default to dark
    return localStorage.getItem("theme") || "dark";
  });
  const [themeClicked, setThemeClicked] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("light-theme", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Track visitor source and send Telegram notification (optional)
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sourceParam = queryParams.get("source") ?? "linkedin or someone"; // Get the 'source' parameter

    if (sourceParam) {
      const botToken = "7325453256:AAHe0NiZ2lWu34Ci3AXNUxA5MfRxuQmDFV8"; // Replace with your bot token
      const chatId = "7280813033"; // Replace with your chat ID
      const message = `🚀 New Visitor Alert!\n\nSource: ${sourceParam}\nTime: ${new Date().toLocaleString()}`;

      // Send message to Telegram
      fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
          message
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Message sent to Telegram:", data);
          // Optional: Remove the query parameter from the URL
          const url = new URL(window.location);
          url.searchParams.delete("source");
          window.history.replaceState({}, document.title, url);
        })
        .catch((error) =>
          console.error("Error sending Telegram message:", error)
        );
    }
  }, []);

  // Custom cursor effect
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
      <Sidebar activeSection={activeSection} />
      <MainContent onSectionChange={setActiveSection} />
    </div>
  );
}

export default App;
