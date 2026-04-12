import API from "./api";

// ✅ Generate Resume
export const generateResumeAPI = async (data) => {
  const res = await API.post("/resume/generate", data);
  return res.data;
};

// ✅ Optimize Resume (PDF upload)
export const optimizeResumeAPI = async (formData) => {
  const res = await API.post("/resume/optimize", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// 🔥 Match Resume
export const matchResumeAPI = async (formData) => {
  const res = await API.post("/resume/match", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};