// src/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import settings from "./settings/settings.json";
import styles from "./styles/HeaderStyles";

const Header = ({ 
    openModal, openDeleteUserModal, openSetAccessLevelModal, openSetPasswordModal, 
    fetchWorkstations, fetchHelpData, fetchShowQueue, fetchShowFinishedTasks
}) => {
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
        {/* Set Password Button */}
        <button
          style={{ ...styles.button, ...styles.buttonSetPassword }}
          onClick={openSetPasswordModal} // Open modal for Create User
        >
          Set Password
        </button>

        {/* Set Access Level Button */}
        <button
          style={{ ...styles.button, ...styles.buttonSetAccessLevel }}
          onClick={openSetAccessLevelModal} // Open modal for Create User
        >
          Set Access Level
        </button>

        {/* Create User Button */}
        <button
          style={{ ...styles.button, ...styles.buttonCreateUser }}
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
      </div>

      <div style={styles.buttonContainer}>
        {/* Workstation Button */}
        <button
          style={{ ...styles.button, ...styles.buttonState }}
          onClick={fetchWorkstations} // Fetch workstations data
        >
          Workstation
        </button>

        {/* Show Queue Button */}
        <button
          style={{ ...styles.button, ...styles.buttonState }}
          onClick={fetchShowQueue} // Open modal for Show Queue
        >
          Tasks Queue
        </button>

        {/* Show Finished Tasks Button */}
        <button
          style={{ ...styles.button, ...styles.buttonState }}
          onClick={fetchShowFinishedTasks} // Open modal for Show Finished Tasks
        >
          Finished Tasks
        </button>
      </div>

      <div style={styles.buttonContainer}>
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
      </div>
    </header>
  );
};

export default Header;
