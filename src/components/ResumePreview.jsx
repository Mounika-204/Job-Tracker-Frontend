const ResumePreview = ({ resume }) => {
  if (!resume) return null;

  return (
    <div className="resume-card">
      <h2>Resume Preview</h2>

      <h3>Skills</h3>
      <ul>
        {resume.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h3>Projects</h3>
      <ul>
        {resume.projects.map((project, index) => (
          <li key={index}>{project}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResumePreview;
