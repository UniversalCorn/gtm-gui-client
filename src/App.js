// src/App.js
import React, { useState } from "react";
import AddExperimentModal from "./AddExperimentModal";
import Cookies from "js-cookie";

function App() {
  const username = Cookies.get("username");

  const [experiments, setExperiments] = useState([
    {
      id: 1,
      name: "Experiment 1",
      queuePosition: 2,
      allocatedResources: "4 GPU, 16 GB RAM",
      status: "Queued",
      startTime: "Not started",
    },
    {
      id: 2,
      name: "Experiment 2",
      queuePosition: 1,
      allocatedResources: "2 GPU, 8 GB RAM",
      status: "Running",
      startTime: "2024-10-21 14:30",
    },
    {
      id: 3,
      name: "Experiment 3",
      queuePosition: null,
      allocatedResources: "8 GPU, 32 GB RAM",
      status: "Completed",
      startTime: "2024-10-21 09:00",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experimentCode, setExperimentCode] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setExperimentCode("");
  };

  const addExperiment = () => {
    if (experimentCode.trim() === "") {
      alert("Please enter the code for the experiment.");
      return;
    }

    const newExperiment = {
      id: experiments.length + 1,
      name: `Experiment ${experiments.length + 1}`,
      queuePosition: experiments.filter((exp) => exp.status === "Queued").length + 1,
      allocatedResources: "2 GPU, 8 GB RAM",
      status: "Queued",
      startTime: "Not started",
    };

    setExperiments([...experiments, newExperiment]);
    closeModal();
  };

  const styles = {
    app: {
      backgroundColor: "#1e1e1e",
      color: "#f5f5f5",
      minHeight: "100vh",
      fontFamily: "'Roboto', sans-serif",
      padding: "20px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "2px solid #444",
      paddingBottom: "10px",
      marginBottom: "20px",
    },
    titleContainer: {
      display: "flex",
      flexDirection: "column",
    },
    title: {
      color: "#f5f5f5",
      fontSize: "2rem",
      marginBottom: "10px",
    },
    username: {
      color: "#aaa",
      fontSize: "1rem",
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#3498db",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.3s",
    },
    buttonDelete: {
      backgroundColor: "#e74c3c",
    },
    buttonLogout: {
      backgroundColor: "#7f8c8d",
    },
    buttonHover: {
      backgroundColor: "#2980b9",
    },
    buttonDeleteHover: {
      backgroundColor: "#c0392b",
    },
    buttonLogoutHover: {
      backgroundColor: "#95a5a6",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    tableHeader: {
      backgroundColor: "#333",
      color: "#f5f5f5",
    },
    tableCell: {
      padding: "10px",
      borderBottom: "1px solid #444",
      textAlign: "center",
    },
    tableRow: {
      backgroundColor: "#2b2b2b",
    },
    tableRowAlt: {
      backgroundColor: "#1f1f1f",
    },
    statusQueued: {
      color: "#f39c12",
    },
    statusRunning: {
      color: "#3498db",
    },
    statusCompleted: {
      color: "#2ecc71",
    },
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>GPU Task Manager</h1>
          <p style={styles.username}>Logged in as: {username}</p>
        </div>
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#3498db")}
            onClick={openModal} // Відкриваємо модальне вікно
          >
            Add Experiment
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonDelete }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#c0392b")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#e74c3c")}
          >
            Delete Experiment
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonLogout }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#95a5a6")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#7f8c8d")}
          >
            Log Out
          </button>
        </div>
      </header>

      <main>
        <h2>Experiments</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableCell}>Experiment Name</th>
              <th style={styles.tableCell}>Queue Position</th>
              <th style={styles.tableCell}>Allocated Resources</th>
              <th style={styles.tableCell}>Status</th>
              <th style={styles.tableCell}>Start Time</th>
            </tr>
          </thead>
          <tbody>
            {experiments.map((experiment, index) => (
              <tr
                key={experiment.id}
                style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
              >
                <td style={styles.tableCell}>{experiment.name}</td>
                <td style={styles.tableCell}>{experiment.queuePosition || "-"}</td>
                <td style={styles.tableCell}>{experiment.allocatedResources}</td>
                <td
                  style={Object.assign({}, styles.tableCell, {
                    color:
                      experiment.status === "Queued"
                        ? styles.statusQueued.color
                        : experiment.status === "Running"
                        ? styles.statusRunning.color
                        : styles.statusCompleted.color,
                  })}
                >
                  {experiment.status}
                </td>
                <td style={styles.tableCell}>{experiment.startTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Використовуємо компонент модального вікна */}
      <AddExperimentModal
        isOpen={isModalOpen}
        experimentCode={experimentCode}
        setExperimentCode={setExperimentCode}
        addExperiment={addExperiment}
        closeModal={closeModal}
      />
    </div>
  );
}

export default App;
