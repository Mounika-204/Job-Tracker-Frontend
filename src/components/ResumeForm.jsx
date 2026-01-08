import React, { useState } from "react";
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const selectStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  background: "#2ecc71",
  color: "#fff",
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};

const ResumeForm = ({ onGenerate }) => {
  const [jobRole, setJobRole] = useState("");

  return (
    <form style={formStyle} onSubmit={(e) => {
      e.preventDefault();
      onGenerate(jobRole);
    }}>
      <h2>Select Job Role</h2>

      <select
        style={selectStyle}
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
      >
        <option value="">-- Select Role --</option>
        <option value="Frontend Developer">Frontend Developer</option>
        <option value="Backend Developer">Backend Developer</option>
      </select>

      <button style={buttonStyle}>Generate</button>
    </form>
  );
};

export default ResumeForm;


