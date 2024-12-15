// src/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import settings from "./settings/settings.json";

function Header({ openModal }) {
  const navigate = useNavigate();
  const username = Cookies.get("username");

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://${settings.serverIP}:${settings.serverPort}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: Cookies.get("token") }),
      });

      const data = await response.json();
      if (data.result) {
        Cookies.remove("token");
        Cookies.remove("username");
        navigate("/");  // Redirect to login page
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };

  const styles = {
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
  };

  return (
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
          onClick={openModal} // Open modal
        >
          Add Experiment
        </button>
        {/* <button
          style={{ ...styles.button, ...styles.buttonDelete }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#c0392b")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#e74c3c")}
        >
          Delete Experiment
        </button> */}
        <button
          style={{ ...styles.button, ...styles.buttonLogout }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#95a5a6")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#7f8c8d")}
          onClick={handleLogout} // Handle logout
        >
          Log Out
        </button>
      </div>
    </header>
  );
}

export default Header;
