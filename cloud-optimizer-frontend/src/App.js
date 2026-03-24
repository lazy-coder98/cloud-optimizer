import React, { useState } from "react";
import axios from "axios";

function App() {
  const [cpu, setCpu] = useState("");
  const [memory, setMemory] = useState("");
  const [storage, setStorage] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://cloud-optimizer-production-a35d.up.railway.app/api/optimize",
        {
          cpuUsage: Number(cpu),
          memoryUsage: Number(memory),
          storageUsage: Number(storage),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error calling API");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Cloud Optimizer 🚀</h1>

      <input
        placeholder="CPU %"
        value={cpu}
        onChange={(e) => setCpu(e.target.value)}
      /><br /><br />

      <input
        placeholder="Memory %"
        value={memory}
        onChange={(e) => setMemory(e.target.value)}
      /><br /><br />

      <input
        placeholder="Storage %"
        value={storage}
        onChange={(e) => setStorage(e.target.value)}
      /><br /><br />

      <button onClick={handleSubmit}>Optimize</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          <p><b>Recommendation:</b> {result.recommendation}</p>
          <p><b>Severity:</b> {result.severity}</p>
          <p><b>Cost Saving:</b> {result.estimatedCostSaving}</p>
        </div>
      )}
    </div>
  );
}

export default App;