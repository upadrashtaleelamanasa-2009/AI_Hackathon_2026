import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UploadCard from "../components/UploadCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { generateDashboard } from "../services/api";
import "../styles/Home.css";

function Home() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const navigate = useNavigate();

  const handleGenerate = async (text, file) => {

    setLoading(true);
    setError("");

    try {

      // Generate dashboard from backend
      const data = await generateDashboard(text, file);

      // Get existing history
      const history =
        JSON.parse(localStorage.getItem("dashboardHistory")) || [];

      // Create new history item
      const historyItem = {
        id: Date.now(),
        title: data.title || "Generated Dashboard",
        prompt: text || "Analyze this dataset",
        dataset: file?.name || "Unknown CSV",
        date: new Date().toLocaleString(),
        dashboard: data
      };

      // Add newest dashboard at the beginning
      history.unshift(historyItem);

      // Save history
      localStorage.setItem(
        "dashboardHistory",
        JSON.stringify(history)
      );

      // Open generated dashboard page
      navigate("/dashboard", {
        state: data
      });

    } catch (err) {

      console.error(err);

      setError(
        err.message || "Failed to generate dashboard."
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <>
      <Navbar />

      <div className="home-page">

        <UploadCard
          file={file}
          setFile={setFile}
          text={text}
          setText={setText}
          loading={loading}
          onGenerate={handleGenerate}
        />

        {loading && <LoadingSpinner />}

        {error && (
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        )}

      </div>
    </>
  );
}

export default Home;