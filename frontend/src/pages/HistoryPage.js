import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/History.css";

function HistoryPage() {

  const navigate = useNavigate();

  const [history, setHistory] = useState([]);

  useEffect(() => {

    const savedHistory =
      JSON.parse(
        localStorage.getItem("dashboardHistory")
      ) || [];

    console.log("HISTORY FROM STORAGE:", savedHistory);

    setHistory(savedHistory);

  }, []);

  const openDashboard = (item) => {

    navigate("/dashboard", {
      state: item.dashboard
    });

  };

  const deleteHistory = (id) => {

    const updatedHistory =
      history.filter(item => item.id !== id);

    localStorage.setItem(
      "dashboardHistory",
      JSON.stringify(updatedHistory)
    );

    setHistory(updatedHistory);

  };

  const clearHistory = () => {

    localStorage.removeItem("dashboardHistory");

    setHistory([]);

  };

  return (
    <>
      <Navbar />

      <div className="history-page">

        <div className="history-header">

          <div>
            <h1>Dashboard History</h1>

            <p>
              View your previously generated AI dashboards.
            </p>
          </div>

          {history.length > 0 && (
            <button
              className="clear-history-btn"
              onClick={clearHistory}
            >
              Clear History
            </button>
          )}

        </div>


        {history.length === 0 ? (

          <div className="empty-history">

            <div className="empty-icon">
              📊
            </div>

            <h2>No Dashboard History</h2>

            <p>
              Generate a dashboard from a CSV file
              and it will appear here.
            </p>

            <button
              onClick={() => navigate("/home")}
              className="generate-btn"
            >
              Generate Dashboard
            </button>

          </div>

        ) : (

          <div className="history-grid">

            {history.map((item) => (

              <div
                className="history-card"
                key={item.id}
              >

                <div className="history-card-top">

                  <div className="history-icon">
                    📊
                  </div>

                  <span className="history-date">
                    {item.date}
                  </span>

                </div>


                <h2>
                  {item.title}
                </h2>


                <div className="history-info">

                  <p>
                    <strong>Dataset:</strong>
                    {" "}
                    {item.dataset}
                  </p>

                  <p>
                    <strong>Request:</strong>
                    {" "}
                    {item.prompt}
                  </p>

                </div>


                <div className="history-actions">

                  <button
                    className="open-history-btn"
                    onClick={() =>
                      openDashboard(item)
                    }
                  >
                    Open Dashboard
                  </button>

                  <button
                    className="delete-history-btn"
                    onClick={() =>
                      deleteHistory(item.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </>
  );
}

export default HistoryPage;