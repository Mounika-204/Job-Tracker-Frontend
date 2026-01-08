import axios from "axios";

const API_URL = "https://job-tracker-backend-e96g.onrender.com";
export const generateResumeAPI = async (jobRole) => {
  const response = await axios.post(
    `${API_URL}/api/resume/generate`,
    { jobRole }
  );
  return response.data;
};


