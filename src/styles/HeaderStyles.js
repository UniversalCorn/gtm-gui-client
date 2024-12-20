// src/BodyStyles.js

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #444",
    paddingBottom: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
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
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "7px",
    marginTop: "7px",
  },
  button: {
    padding: "10px 12px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
  buttonSetPassword: {
    backgroundColor: "#3498db", // Blue color for set access level button
  },
  buttonSetAccessLevel: {
    backgroundColor: "#3498db", // Blue color for set access level button
  },
  buttonCreateUser: {
    backgroundColor: "#7f00ff", // Violet color for create button
  },
  buttonDelete: {
    backgroundColor: "#e74c3c", // Red color for delete button
  },
  buttonHelp: {
    backgroundColor: "#e67e22", // Orange color for help button
  },
  buttonLogout: {
    backgroundColor: "#7f8c8d", // Gray color for logout button
  },
  buttonState: {
    backgroundColor: "#2ecc71", // Green color for workstation button
  },
};

export default styles;
