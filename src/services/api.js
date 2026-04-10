import axios from "axios";

const API = axios.create({
  baseURL: "https://job-tracker-backend-e96g.onrender.com/api",
});

// ✅ CLEAN VERSION
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN:", token); // debug

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;