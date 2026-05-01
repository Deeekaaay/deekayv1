import React, { useEffect } from "react";

const ResumeDownload = () => {
  useEffect(() => {
    window.location.replace("/assets/DineshkumarDeekay.pdf");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "var(--text-main)",
        backgroundColor: "var(--bg-main)",
      }}
    >
      <p>Redirecting to Resume...</p>
    </div>
  );
};

export default ResumeDownload;
