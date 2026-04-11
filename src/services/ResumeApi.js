// ResumeApi.js

import API from "./api"; // ✅ use your interceptor (important for token)

// ✅ Generate Resume
export const generateResumeAPI = (data) =>
  API.post("/resume/generate", data);

// ✅ Optimize Resume (PDF upload)
export const optimizeResumeAPI = (formData) =>
  API.post("/resume/optimize", formData);

// 🔥 MATCH RESUME (VERY IMPORTANT)
export const matchResumeAPI = (formData) =>
  API.post("/resume/match", formData);