const ResumePreview = ({ resume }) => {
  if (!resume) return null;

  return (
    <div>
      <h2>{resume.name}</h2>
      <p>{resume.summary}</p>

      <h3>Skills</h3>
      <ul>
        {resume.skills?.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h3>Projects</h3>
      <ul>
        {resume.projects?.map((proj, index) => (
          <li key={index}>{proj}</li>
        ))}
      </ul>

      <h3>Experience</h3>
      {resume.experience?.map((exp, index) => (
        <div key={index}>
          <strong>{exp.role}</strong> – {exp.company}
          <p>{exp.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ResumePreview;