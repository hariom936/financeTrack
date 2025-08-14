import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/user/login", { userEmail: email, password });
      login(res.data.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          className="border p-2 w-full mb-3"
          type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} required
        />
        <input
          className="border p-2 w-full mb-4"
          type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} required
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full">
          Login
        </button>
        <p className="text-center mt-4 text-sm">
          Don't have an account? <Link className="text-blue-500" to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
