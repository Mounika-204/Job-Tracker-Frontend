import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emoji, setEmoji] = useState("👋");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and Password required");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/api/users/login", {
        email,
        password,
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Navigate after login
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back <span>{emoji}</span>
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500"
            onFocus={() => setEmoji("📧")}
            onBlur={() => setEmoji("👋")}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500"
            onFocus={() => setEmoji("🔒")}
            onBlur={() => setEmoji("👋")}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login 🚀"}
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-emerald-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;