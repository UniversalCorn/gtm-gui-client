// src/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import settings from "./settings/settings.json";
import styles from "./styles/HeaderStyles";

const Header = ({ openModal, openDeleteUserModal, fetchWorkstations, fetchHelpData }) => {
  const navigate = useNavigate();
  const username = Cookies.get("username");

  const handleLogout = () => {
    Cookies.remove("username");
    Cookies.remove("token");
    navigate("/"); // Redirect to the login page
  };

  return (
    <header style={styles.header}>
      <div style={styles.titleContainer}>
        <h1 style={styles.title}>GPU Task Manager</h1>
        <p style={styles.username}>Logged in as: {username}</p>
      </div>
      <div style={styles.buttonContainer}>
        {/* Create User Button */}
        <button
          style={styles.button}
          onClick={openModal} // Open modal for Create User
        >
          Create User
        </button>

        {/* Delete User Button */}
        <button
          style={{ ...styles.button, ...styles.buttonDelete }}
          onClick={openDeleteUserModal} // Open modal for Delete User
        >
          Delete User
        </button>

        {/* Help Button */}
        <button
          style={{ ...styles.button, ...styles.buttonHelp }}
          onClick={fetchHelpData} // Fetch help data
        >
          Help
        </button>

        {/* Log Out Button */}
        <button
          style={{ ...styles.button, ...styles.buttonLogout }}
          onClick={handleLogout} // Handle logout
        >
          Log Out
        </button>

        {/* Workstation Button */}
        <button
          style={{ ...styles.button, ...styles.buttonWorkstation }}
          onClick={fetchWorkstations} // Fetch workstations data
        >
          Workstation
        </button>
      </div>
    </header>
  );
};

export default Header;
