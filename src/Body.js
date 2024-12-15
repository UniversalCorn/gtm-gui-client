// src/Body.js
import React from "react";
import styles from "./styles/BodyStyles";

function Body({ data, workstations, helpData, showQueueData, finishedTasksData }) {

  // Function to render the table dynamically based on the data structure
  const renderTable = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      // Render Workstations Data (as before)
      const headers = ["Type", "ID", "Memory", "Processes", "Max Processes"];
      
      const rows = [];
      
      data.forEach((workstation) => {
        // Loop through GPUs - Shared
        workstation["gpus-shared"]?.forEach((gpu) => {
          const gpuData = gpu.split(", "); // Split GPU string into parts
          const gpuRow = {
            type: "GPU Shared",
            id: gpuData[0].split(": ")[1],
            memory: gpuData[1].split(": ")[1],
            processes: gpuData[2].split(": ")[1],
            maxProcesses: gpuData[3].split(": ")[1],
          };
          rows.push(gpuRow);
        });

        // Loop through GPUs - Personal
        workstation["gpus-personal"]?.forEach((gpu) => {
          const gpuData = gpu.split(", ");
          const gpuRow = {
            type: "GPU Personal",
            id: gpuData[0].split(": ")[1],
            memory: gpuData[1].split(": ")[1],
            processes: gpuData[2].split(": ")[1],
            maxProcesses: gpuData[3].split(": ")[1],
          };
          rows.push(gpuRow);
        });

        // Loop through CPUs
        workstation["cpus"]?.forEach((cpu) => {
          const cpuData = cpu.split(", ");
          const cpuRow = {
            type: "CPU",
            id: cpuData[0].split(": ")[1],
            memory: "-",
            processes: cpuData[1].split(": ")[1],
            maxProcesses: cpuData[2].split(": ")[1],
          };
          rows.push(cpuRow);
        });
      });

      return (
        <table style={styles.table}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} style={styles.tableCell}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} style={rowIndex % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                <td style={styles.tableCell}>{row.type}</td>
                <td style={styles.tableCell}>{row.id}</td>
                <td style={styles.tableCell}>{row.memory}</td>
                <td style={styles.tableCell}>{row.processes}</td>
                <td style={styles.tableCell}>{row.maxProcesses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (typeof data === "string" && data.trim().length > 0) {
      // Parsing Help Data (received as a string)
      const helpHeaders = ["Command", "Description"];
      const helpRows = [];

      // Split the data into lines
      const lines = data.split("\n").map(line => line.trim()).filter(line => line.length > 0);

      // For each line, split by the first colon (:) and extract command and description
      lines.forEach((line) => {
        const [command, description] = line.split(":");
        if (command && description) {
          helpRows.push({ command: command.trim(), description: description.trim() });
        }
      });

      return (
        <table style={styles.table}>
          <thead>
            <tr>
              {helpHeaders.map((header, index) => (
                <th key={index} style={styles.tableCell}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {helpRows.map((row, rowIndex) => (
              <tr key={rowIndex} style={rowIndex % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                <td style={styles.tableCell}>{row.command}</td>
                <td style={styles.tableCell}>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return <p>No data available</p>;
  };

  // Check if the showQueueData is available and is a string
  const renderShowQueueData = () => {
        if (typeof showQueueData === "string" && showQueueData.trim().length > 0) {
            return <pre>{JSON.parse(showQueueData).result.join("\n\n")}</pre>; // Display the showQueueData as text
        }
    return null;
  };

  // Function to render finished tasks data
  const renderFinishedTasks = () => {
        if (typeof finishedTasksData === "string" && finishedTasksData.trim().length > 0) {
            return <pre>{JSON.parse(finishedTasksData).result.join("\n\n")}</pre>;
        }
        return null;
  };

  // Determine the correct header based on available data
  const determineHeader = () => {
    if (workstations) return "Workstations Details";
    if (helpData) return "Help Details";
    if (showQueueData) return "Queue Details";
    if (finishedTasksData) return "Finished Tasks";
    return "No Data Available";
  };

  return (
    <main>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>{determineHeader()}</h2>
      
      {renderFinishedTasks() || renderShowQueueData() || renderTable(data)} {/* Show queue data or table */}

    </main>
  );
}

export default Body;
