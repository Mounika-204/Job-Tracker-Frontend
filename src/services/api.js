import axios from "axios";

const API = axios.create({
  baseURL: "https://job-tracker-backend-e96g.onrender.com/api",
});

// ✅ Request interceptor
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor (IMPORTANT for 401 errors)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔥 Auto logout if token expired
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized - logging out");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;