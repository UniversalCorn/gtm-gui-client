// src/App.js
import React, { useState } from "react";
import AddExperimentModal from "./AddExperimentModal";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import settings from "./settings/settings.json";
import Header from "./Header"; // Import Header component
import Body from "./Body"; // Import Body component

function App() {
  // const navigate = useNavigate();  // Initialize navigate hook
  // const username = Cookies.get("username");

  const [experiments, setExperiments] = useState([
    {
      id: 1,
      name: "Experiment 1",
      queuePosition: 2,
      allocatedResources: "4 GPU, 16 GB RAM",
      status: "Queued",
      startTime: "Not started",
    },
    {
      id: 2,
      name: "Experiment 2",
      queuePosition: 1,
      allocatedResources: "2 GPU, 8 GB RAM",
      status: "Running",
      startTime: "2024-10-21 14:30",
    },
    {
      id: 3,
      name: "Experiment 3",
      queuePosition: null,
      allocatedResources: "8 GPU, 32 GB RAM",
      status: "Completed",
      startTime: "2024-10-21 09:00",
    },
  ]);

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

  return (
    <div style={{ backgroundColor: "#1e1e1e", color: "#f5f5f5", minHeight: "100vh", fontFamily: "'Roboto', sans-serif", padding: "20px" }}>
      <Header openModal={openModal} /> {/* Use Header component */}
      <Body experiments={experiments} /> {/* Use Body component */}
      
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
