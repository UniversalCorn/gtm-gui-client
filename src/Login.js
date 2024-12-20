import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import settings from "./settings/settings.json";
import ErrorPopup from "./ErrorPopup";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (login.trim() && password.trim()) {
      try {
        const response = await fetch(
          `http://${settings.serverIP}:${settings.serverPort}/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: login, password: password }),
          }
        );

        const data = await response.json();

        if (data.result) {
          Cookies.set("token", data.token);
          Cookies.set("username", login);
          navigate("/app");
        } else {
          setPopupMessage(data.message); // Set error message for the popup
          setIsPopupOpen(true); // Open the popup
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setPopupMessage("An error occurred. Please try again."); // General error message
        setIsPopupOpen(true); // Open the popup
      }
    } else {
      setPopupMessage("Please enter both login and password."); // Validation error
      setIsPopupOpen(true); // Open the popup
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupMessage("");
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#1e1e1e",
      color: "#f5f5f5",
      fontFamily: "'Roboto', sans-serif",
    },
    input: {
      padding: "10px",
      margin: "10px 0",
      fontSize: "1rem",
      borderRadius: "5px",
      border: "1px solid #555",
      backgroundColor: "#333",
      color: "#fff",
      width: "300px",
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
    buttonHover: {
      backgroundColor: "#2980b9",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      fontSize: "2rem",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <input
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button style={styles.button} onClick={handleLogin}>
        Login
      </button>

      {/* TODO: make sure message is passed when credentials are wrong */}
      <ErrorPopup isOpen={isPopupOpen} message={popupMessage ? popupMessage : 'Wrong login or password'} onClose={closePopup} />
    </div>
  );
}

export default Login;
