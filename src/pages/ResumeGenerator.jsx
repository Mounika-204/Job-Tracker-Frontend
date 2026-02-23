import React, { useState } from "react";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import { generateResumeAPI } from "../services/ResumeApi"; // ✅ exact match

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
    color: "#555",
  },
};

const ResumeGenerator = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (formData) => {
    try {
      setLoading(true);
      setResume(null); // reset previous resume
      console.log("Sending to backend:", formData);

      const data = await generateResumeAPI(formData);
      console.log("Generated Resume:", data);

      setResume(data);
    } catch (err) {
      console.error("Error generating resume:", err);
      alert(err?.response?.data?.message || "Failed to generate resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Resume Generator</h1>

      <div style={styles.card}>
        <ResumeForm onGenerate={handleGenerate} disabled={loading} />
      </div>

      {loading && <p style={styles.loading}>Generating resume...</p>}

      {resume && (
        <div style={{ ...styles.card, minHeight: "200px" }}>
          <ResumePreview resume={resume} />
        </div>
      )}
    </div>
  );
};

export default ResumeGenerator;