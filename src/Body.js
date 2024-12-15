// src/Body.js
import React from "react";

function Body({ experiments }) {
  const styles = {
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
  );
}

export default Body;
