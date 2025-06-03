// src/App.js
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import "./styles/App.css";
import "./styles/theme.css";

function App() {
  const [activeSection, setActiveSection] = useState("about");

  // Track visitor source and send Telegram notification (optional)
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sourceParam = queryParams.get("source") ?? "linkedin or someone";
    if (sourceParam) {
      // Uncomment and configure to enable Telegram notifications
      // const botToken = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
      // const chatId = process.env.REACT_APP_TELEGRAM_CHAT_ID;
      // const message = `🚀 New Visitor Alert!\n\nSource: ${sourceParam}\nTime: ${new Date().toLocaleString()}`;
      // fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
      //   .then((response) => response.json())
      //   .then((data) => { /* handle success */ })
      //   .catch((error) => console.error("Error sending Telegram message:", error));
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
      <div className="custom-cursor" />
      <Sidebar activeSection={activeSection} />
      <MainContent onSectionChange={setActiveSection} />
    </div>
  );
}

export default App;
