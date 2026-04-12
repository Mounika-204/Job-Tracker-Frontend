import API from "./api";   

const API = axios.create({
  baseURL: "https://job-tracker-backend-e96g.onrender.com/api",
});

// ✅ REQUEST INTERCEPTOR
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("SENDING TOKEN:", token);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;