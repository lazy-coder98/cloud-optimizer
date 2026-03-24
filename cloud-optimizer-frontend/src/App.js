import React, { useState } from "react";
import axios from "axios";
import "./App.css";

/** Same origin when UI is served by Spring Boot; set REACT_APP_API_URL for a separate frontend host. */
const API_BASE = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");

function App() {
  const [cpu, setCpu] = useState("");
  const [memory, setMemory] = useState("");
  const [storage, setStorage] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_BASE}/api/optimize`,
        {
          cpuUsage: Number(cpu),
          memoryUsage: Number(memory),
          storageUsage: Number(storage),
        },
        {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        }
      );

      setResult(res.data);
    } catch (err) {
      alert("Error calling API");
    }
  };

  return (
    <div className="container">
      <h1>☁️ Cloud Optimizer</h1>

      <div className="card">
        <input
          type="number"
          placeholder="CPU Usage (%)"
          value={cpu}
          onChange={(e) => setCpu(e.target.value)}
        />
        <input
          type="number"
          placeholder="Memory Usage (%)"
          value={memory}
          onChange={(e) => setMemory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Storage Usage (%)"
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
        />

        <button onClick={handleSubmit}>Optimize 🚀</button>
      </div>

      {result && (
        <div className="result-card">
          <h2>Result</h2>
          <p><b>Recommendation:</b> {result.recommendation}</p>
          <p><b>Severity:</b> {result.severity}</p>
          <p><b>Cost Saving:</b> {result.estimatedCostSaving}</p>
        </div>
      )}
    </div>
  );
}

export default App;