import axios from "axios";

const API = axios.create({
  baseURL: "https://job-tracker-backend-e96g.onrender.com",
  headers: { "Content-Type": "application/json" },
});

// Automatically attach JWT token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;