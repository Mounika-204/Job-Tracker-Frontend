import axios from "axios";

export const generateResumeAPI = async (payload) => {
  const response = await axios.post(
    "http://localhost:5000/api/resume/generate",
    payload,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
};

