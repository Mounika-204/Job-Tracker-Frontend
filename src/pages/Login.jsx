import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and Password required");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/users/login", {
        email,
        password,
      });

      // ✅ FIXED: Save token properly
      localStorage.setItem(
        "user",
        JSON.stringify({ token: res.data.token })
      );

      alert("Login Successful ✅");
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* your same UI */}
      <button onClick={handleLogin}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}

export default Login;