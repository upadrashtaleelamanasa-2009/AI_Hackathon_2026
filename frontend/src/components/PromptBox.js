import React, { useState } from "react";
import "../styles/PromptBox.css";

function PromptBox({ onGenerate, loading }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    onGenerate(text, file);
  };

  return (
    <div className="prompt-card">

      <h2>Upload CSV Dataset</h2>

      <div className="form-group">
        <label>Select CSV File</label>

        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <div className="form-group">
        <label>Dashboard Description</label>

        <textarea
          placeholder="Example: Create HR Analytics Dashboard with KPI cards, charts and employee insights..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="generate-btn"
      >
        {loading ? "Generating Dashboard..." : "Generate Dashboard"}
      </button>

    </div>
  );
}

export default PromptBox;