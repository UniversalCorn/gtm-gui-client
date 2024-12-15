// src/AddExperimentModal.js
import React from "react";

function AddExperimentModal({ isOpen, experimentCode, setExperimentCode, addExperiment, closeModal }) {
  const styles = {
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: "#333",
      padding: "20px",
      borderRadius: "10px",
      width: "400px",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      fontSize: "1rem",
      borderRadius: "5px",
      border: "1px solid #555",
      backgroundColor: "#444",
      color: "#fff",
    },
    modalButton: {
      padding: "10px 20px",
      marginRight: "10px",
      backgroundColor: "#3498db",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
    },
    closeButton: {
      backgroundColor: "#e74c3c",
    },
  };

  // Якщо модальне вікно не відкрите, не відображаємо компонент
  if (!isOpen) {
    return null;
  }

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h3>Add New Experiment</h3>
        <input
          type="text"
          placeholder="Enter experiment code"
          value={experimentCode}
          onChange={(e) => setExperimentCode(e.target.value)}
          style={styles.input}
        />
        <div>
          <button style={styles.modalButton} onClick={addExperiment}>
            Add
          </button>
          <button style={{ ...styles.modalButton, ...styles.closeButton }} onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddExperimentModal;
