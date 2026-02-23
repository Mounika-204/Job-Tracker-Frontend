// ResumeApi.js
import axios from "axios"; // or import API from "../api"; if you have a custom API file

export const generateResumeAPI = async (payload) => {
  const response = await axios.post("http://localhost:5000/api/resume/generate", payload); // change URL to your backend
  return response.data;
};