import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://job-tracker-backend-e96g.onrender.com";

const Register = () => {
  const navigate = useNavigate(); // ✅ for auto navigation

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emoji, setEmoji] = useState("🙂");

  const registerUser = async () => {
    // ✅ basic validation
    if (!name || !email || !password) {
      alert("All fields required ❗");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/users/register`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("SUCCESS:", res.data);

      // ✅ SUCCESS → auto navigate to login
      alert("Registration successful 🎉");
      navigate("/login");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Registration failed 😢 Please try again"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center">
          Create Account
          <span className="ml-2 animate-bounce">{emoji}</span>
        </h2>

        <div className="space-y-4">
          {/* NAME */}
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onFocus={() => setEmoji("😄")}
              onBlur={() => setEmoji("🙂")}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="absolute right-3 top-3 text-xl">{emoji}</span>
          </div>

          {/* EMAIL */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onFocus={() => setEmoji("📧")}
              onBlur={() => setEmoji("🙂")}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onFocus={() => setEmoji("🔒")}
              onBlur={() => setEmoji("🙂")}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* REGISTER BUTTON */}
        <button type="submit"
          onClick={registerUser}
          className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition duration-300 flex items-center justify-center gap-2"
        >
          Register <span>🚀</span>
        </button>

        {/* LOGIN LINK */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
