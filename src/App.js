import React, { useState, useEffect } from "react";
import AddExperimentModal from "./AddExperimentModal";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import settings from "./settings/settings.json";
import Header from "./Header"; // Import Header component
import Body from "./Body"; // Import Body component

function App() {
  const navigate = useNavigate();  // Initialize navigate hook
  const username = Cookies.get("username");

  const [experiments, setExperiments] = useState([/* your experiments data here */]);
  const [workstations, setWorkstations] = useState(null);  // State to store workstations data
  const [helpData, setHelpData] = useState(null);  // State to store help data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experimentCode, setExperimentCode] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setExperimentCode("");
  };

  const addExperiment = () => {
    if (experimentCode.trim() === "") {
      alert("Please enter the code for the experiment.");
      return;
    }

    const newExperiment = {
      id: experiments.length + 1,
      name: `Experiment ${experiments.length + 1}`,
      queuePosition: experiments.filter((exp) => exp.status === "Queued").length + 1,
      allocatedResources: "2 GPU, 8 GB RAM",
      status: "Queued",
      startTime: "Not started",
    };

    setExperiments([...experiments, newExperiment]);
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
    } catch (error) {
      console.error("Error fetching help data:", error);
      alert("An error occurred while fetching help data.");
    }
  };

  // Fetch help data when the component is mounted
  useEffect(() => {
    fetchHelpData();  // Fetch help data when the component is mounted
  }, []);  // Empty dependency array ensures this runs only once

  return (
    <div style={{ backgroundColor: "#1e1e1e", color: "#f5f5f5", minHeight: "100vh", fontFamily: "'Roboto', sans-serif", padding: "20px" }}>
      <Header
        openModal={openModal}
        fetchWorkstations={fetchWorkstations}
        fetchHelpData={fetchHelpData}  // Pass fetchHelpData to Header
      />
      
      {/* Pass workstations or help data to Body */}
      <Body data={workstations || helpData || experiments} />

      {/* Use the modal component */}
      <AddExperimentModal
        isOpen={isModalOpen}
        experimentCode={experimentCode}
        setExperimentCode={setExperimentCode}
        addExperiment={addExperiment}
        closeModal={closeModal}
      />
    </div>
  );
}

export default App;
