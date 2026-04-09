import axios from "axios";

const API = axios.create({
  baseURL: "https://job-tracker-backend-e96g.onrender.com/api",
});

// ✅ ADD THIS
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});

export default API;