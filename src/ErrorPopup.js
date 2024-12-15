import React from "react";
import "./styles/ErrorPopup.css";

function ErrorPopup({ isOpen, message, onClose }) {
  if (!isOpen) {
    return null;
  }
  
  return (
    <div className="error-popup">
      <div className="error-popup-content">
        <span className="error-popup-message">{message}</span>
        <button className="error-popup-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ErrorPopup;