import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import settings from "./settings/settings.json";
import Header from "./Header";
import Body from "./Body";
import CreateUserModal from "./CreateUserModal";

function App() {
  const navigate = useNavigate();
  const username = Cookies.get("username");

  const [experiments, setExperiments] = useState([/* your experiments data here */]);
  const [workstations, setWorkstations] = useState(null);
  const [helpData, setHelpData] = useState(null);
  const [showQueueData, setShowQueueData] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSetAccessLevelModalOpen, setIsSetAccessLevelModalOpen] = useState(false);
  const [isSetPasswordModalOpen, setIsSetPasswordModalOpen] = useState(false);

  const openCreateUserModal = () => {
    setIsCreateModalOpen(true);
  };

  const openDeleteUserModal = () => {
    setIsDeleteModalOpen(true);
  };

  const openSetAccessLevelModal = () => {
    setIsSetAccessLevelModalOpen(true);
  };

  const openSetPasswordModal = () => {
    setIsSetPasswordModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsSetAccessLevelModalOpen(false);
    setIsSetPasswordModalOpen(false);
  };

  const createUser = async (userData) => {
    const { username, password, accessLevel } = userData;
    const finalAccessLevel = Number(accessLevel) || 4;
    const token = Cookies.get("token");

    if (!token) {
      alert("Token not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`http://${settings.serverIP}:${settings.serverPort}/createUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUsername: username,
          password,
          accessLevel: finalAccessLevel,
          token,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert("User created successfully!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Failed to create user."}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred while creating the user.");
    }

    closeModal();
  };

  const deleteUser = async (userData) => {
    const { username } = userData;
    const token = Cookies.get("token");

    if (!token) {
      alert("Token not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`http://${settings.serverIP}:${settings.serverPort}/deleteUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUsername: username,
          token,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert("User deleted successfully!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Failed to delete user."}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }

    closeModal();
  };

  const setAccessLevel = async (userData) => {
    const { username, newAccessLevel } = userData;
    const token = Cookies.get("token");
  
    if (!token) {
      alert("Token not found. Please log in again.");
      return;
    }
  
    try {
      const response = await fetch(`http://${settings.serverIP}:${settings.serverPort}/setAccessLevel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUsername: username,
          newAccessLevel: parseInt(newAccessLevel, 10),
          token,
        }),
      });
  
      if (response.ok) {
        alert("Access level updated successfully!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Failed to update access level."}`);
      }
    } catch (error) {
      console.error("Error updating access level:", error);
      alert("An error occurred while updating the access level.");
    }
  
    closeModal();
  };
  
  const setPassword = async (userData) => {
    const { password } = userData;
    const token = Cookies.get("token");
  
    if (!token) {
      alert("Token not found. Please log in again.");
      return;
    }
  
    try {
      const response = await fetch(`http://${settings.serverIP}:${settings.serverPort}/setPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password
        }),
      });
  
      if (response.ok) {
        alert("Password updated successfully!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Failed to update password."}`);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating the password.");
    }
  
    closeModal();
  };

  // Fetch workstations data
  const fetchWorkstations = async () => {
    try {
      const response = await fetch(`http://${settings.serverIP}:${settings.serverPort}/workstations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),  // Empty body for the request
      });

      const data = await response.json();
      console.log("Workstations data:", data);
      setWorkstations(data.result);  // Update the state with the workstations data
      setHelpData(null);  // Clear help data when fetching workstations
      setShowQueueData(null); // Clear show queue data when fetching workstations
    } catch (error) {
      console.error("Error fetching workstations:", error);
      alert("An error occurred while fetching workstations.");
    }
  };

  // Fetch help data
  const fetchHelpData = async () => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(`http://${settings.serverIP}:${settings.serverPort}/help`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),  // Empty body for the request
      });

      const data = await response.json();
      console.log("Help data:", data);
      setHelpData(data.result);  // Set the help data
      setWorkstations(null);  // Clear workstations data when fetching help
      setShowQueueData(null); // Clear show queue data when fetching help
    } catch (error) {
      console.error("Error fetching help data:", error);
      alert("An error occurred while fetching help data.");
    }
  };

  // Fetch Show Queue data
  const fetchShowQueue = async () => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(`http://${settings.serverIP}:${settings.serverPort}/showQueue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.text(); // The result is a string
        setShowQueueData(data); // Store the result
        setHelpData(null); // Clear help data when fetching show queue
        setWorkstations(null); // Clear workstations data when fetching show queue
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Failed to fetch show queue data."}`);
      }
    } catch (error) {
      console.error("Error fetching show queue:", error);
      alert("An error occurred while fetching the show queue data.");
    }
  };

  // Fetch help data when the component is mounted
  useEffect(() => {
    fetchHelpData();  // Fetch help data when the component is mounted
  }, []);

  return (
    <div style={{ backgroundColor: "#1e1e1e", color: "#f5f5f5", minHeight: "100vh", fontFamily: "'Roboto', sans-serif", padding: "20px" }}>
      <Header
        openModal={openCreateUserModal}
        fetchWorkstations={fetchWorkstations}
        fetchHelpData={fetchHelpData}
        openDeleteUserModal={openDeleteUserModal}
        openSetAccessLevelModal={openSetAccessLevelModal}
        openSetPasswordModal={openSetPasswordModal}
        fetchShowQueue={fetchShowQueue} // Pass the fetchShowQueue function to Header
      />

      <Body data={showQueueData || workstations || helpData || experiments} 
        workstations={workstations}
        helpData={helpData}
        showQueueData={showQueueData}
      /> {/* Render Show Queue data in Body */}

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={closeModal}
        onCreateUser={createUser}
        fieldsConfig={[
          { name: "username", label: "Username", type: "text", required: true },
          { name: "password", label: "Password", type: "password", required: true },
          { name: "accessLevel", label: "Access Level", type: "text", required: true, defaultValue: "4" },
        ]}
        mode="create"
        title="Create User"
        buttonTitle="Create User"
      />

      <CreateUserModal
        isOpen={isDeleteModalOpen}
        onClose={closeModal}
        onCreateUser={deleteUser}
        fieldsConfig={[
          { name: "username", label: "Username", type: "text", required: true },
        ]}
        mode="delete"
        title="Delete User"
        buttonTitle="Delete User"
      />

      <CreateUserModal
        isOpen={isSetAccessLevelModalOpen}
        onClose={closeModal}
        onCreateUser={setAccessLevel} // Pass the function to handle request
        fieldsConfig={[
          { name: "username", label: "Username", type: "text", required: true },
          { name: "newAccessLevel", label: "New Access Level", type: "text", required: true },
        ]}
        mode="setAccessLevel"
        title="Set Access Level"
        buttonTitle="Set Access Level"
      />

      <CreateUserModal
        isOpen={isSetPasswordModalOpen}
        onClose={closeModal}
        onCreateUser={setPassword} // Pass the function to handle request
        fieldsConfig={[
          { name: "password", label: "New Password", type: "password", required: true },
        ]}
        mode="setPassword"
        title="Set Password"
        buttonTitle="Set Password"
      />
    </div>
  );
}

export default App;
