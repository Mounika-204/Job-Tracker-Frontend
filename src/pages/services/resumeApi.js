import API from "./api";

export const generateResumeAPI = async (payload) => {
  const response = await API.post(
    "/api/resume/generate",
    payload
  );

  return response.data;
};