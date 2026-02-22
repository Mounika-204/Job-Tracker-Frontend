import React, { useState } from "react";

const ResumeForm = ({ onGenerate }) => {
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onGenerate({
      jobRole,
      jobDescription
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Job Role"
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
        required
      />

      <textarea
        placeholder="Paste Job Description here"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={6}
        required
      />

      <button type="submit">Generate Resume</button>
    </form>
  );
};

export default ResumeForm;