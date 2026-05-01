// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import ScrollToTop from "./components/ui/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <DataProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </DataProvider>
  </BrowserRouter>,
);
