const ResumePreview = ({ resume }) => {
  if (!resume) return null;

  // ✅ CASE 1: If backend sends plain text (string)
  if (typeof resume === "string") {
    return (
      <div>
        <h2>Generated Resume</h2>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {resume}
        </pre>
      </div>
    );
  }

  // ✅ CASE 2: If backend sends structured object
  return (
    <div>
      <h2>{resume.name}</h2>
      <p>{resume.summary}</p>

      {resume.skills?.length > 0 && (
        <>
          <h3>Skills</h3>
          <ul>
            {resume.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </>
      )}

      {resume.projects?.length > 0 && (
        <>
          <h3>Projects</h3>
          <ul>
            {resume.projects.map((proj, index) => (
              <li key={index}>{proj}</li>
            ))}
          </ul>
        </>
      )}

      {resume.experience?.length > 0 && (
        <>
          <h3>Experience</h3>
          {resume.experience.map((exp, index) => (
            <div key={index}>
              <strong>{exp.role}</strong> – {exp.company}
              <p>{exp.description}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ResumePreview;