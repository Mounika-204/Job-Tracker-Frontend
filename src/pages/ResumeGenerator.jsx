import React, { useState } from "react";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import { generateResumeAPI } from "./services/resumeApi";

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#2c3e50",
  },
  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  },
  loading: {
    textAlign: "center",
    margin: "20px 0",
    fontStyle: "italic",
  },
};

const ResumeGenerator = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (jobRole) => {
    try {
      setLoading(true);
      const data = await generateResumeAPI(jobRole); // Call backend
      console.log("Generated Resume:", data); // Debug
      setResume(data);
    } catch (err) {
      alert("Failed to generate resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Resume Generator</h1>

      <div style={styles.card}>
        <ResumeForm onGenerate={handleGenerate} />
      </div>

      {loading && <p style={styles.loading}>Generating resume...</p>}

      {resume && (
        <div style={styles.card}>
          <ResumePreview resume={resume} />
        </div>
      )}
    </div>
  );
};

export default ResumeGenerator;