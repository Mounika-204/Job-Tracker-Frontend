import React, { useState } from "react";
import { matchResumeAPI } from "../services/ResumeApi";

const ResumeForm = ({ onGenerate }) => {
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  // ✅ Generate Resume
  const handleSubmit = (e) => {
    e.preventDefault();

    onGenerate({
      jobRole,
      jobDescription
    });
  };

  // 🔥 MATCH FUNCTION
  const handleMatch = async () => {
    if (!file || !jobDescription) {
      alert("Upload resume and enter job description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      const res = await matchResumeAPI(formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Matching failed");
    }
  };

  return (
    <div>
      {/* ================= GENERATE RESUME ================= */}
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

      {/* ================= MATCH RESUME ================= */}
      <hr />

      <h3>Upload Resume & Check Match</h3>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleMatch}>
        Check Match
      </button>

      {/* ================= RESULT ================= */}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Match Score: {result.score}%</h2>

          <h4>Matched Skills:</h4>
          <ul>
            {result.matched.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>

          <h4>Missing Skills:</h4>
          <ul>
            {result.missing.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeForm;