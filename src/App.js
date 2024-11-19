// src/App.js
import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import "./styles/App.css";
import "./styles/theme.css";

function App() {
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");

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
      <div className="custom-cursor"></div>
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
