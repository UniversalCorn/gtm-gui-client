import React, { useState, useEffect } from "react";

function CreateUserModal({ isOpen, onClose, onCreateUser, fieldsConfig, mode, title }) {
  const initialFormState = fieldsConfig.reduce((acc, field) => {
    acc[field.name] = field.defaultValue || "";
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialFormState);
  const [isValid, setIsValid] = useState(false);

  // Handle form input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form to enable the "Ok" button
  useEffect(() => {
    // Check if all required fields are filled
    const isFormValid = fieldsConfig.every(
      (field) => !field.required || formData[field.name] // Only check required fields
    );
    setIsValid(isFormValid);
  }, [formData, fieldsConfig]);

  const handleOk = () => {
    onCreateUser(formData); // Pass form data to the parent
    setFormData(initialFormState); // Reset form fields to default values
    onClose(); // Close the modal after submission
  };

  return isOpen ? (
    <div style={styles.modalContainer}>
      <div style={styles.modal}>
        <h3 style={styles.modalTitle}>{title}</h3>
        <div style={styles.modalContent}>
          {fieldsConfig.map((field) => (
            <div key={field.name} style={styles.inputGroup}>
              <label htmlFor={field.name} style={styles.inputLabel}>
                {field.label} {field.required && "*"}
              </label>
              <input
                type={field.type || "text"}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
          ))}
        </div>
        <div style={styles.modalButtons}>
          <button
            style={isValid ? styles.button : { ...styles.button, ...styles.buttonDisabled }}
            onClick={handleOk}
            disabled={!isValid}
          >
            {mode === "create" ? "Create User" : "Delete User"}
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonClose }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

const styles = {
  modalContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "300px",
    textAlign: "center",
  },
  modalTitle: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    color: "#2c3e50",
    fontWeight: "bold",
  },
  modalContent: {
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  inputLabel: {
    display: "block",
    marginBottom: "5px",
    color: "#34495e",
    fontSize: "1rem",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    color: "#34495e",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#27ae60", // Green color when enabled
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
  buttonDisabled: {
    backgroundColor: "#bdc3c7", // Gray color when disabled
    cursor: "not-allowed", // Show a not-allowed cursor when disabled
  },
  buttonClose: {
    backgroundColor: "#c0392b", // Red for close button
  },
};

export default CreateUserModal;
