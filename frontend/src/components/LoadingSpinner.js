import React from "react";
import "../styles/Loader.css";

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Generating your dashboard...</p>
    </div>
  );
}

export default LoadingSpinner;