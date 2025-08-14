import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow p-8 rounded">
      <h1 className="text-2xl font-bold mb-4">Welcome {user?.name}!</h1>
      <p className="mb-2"><span className="font-semibold">Email:</span> {user?.email}</p>
      <p className="mb-6"><span className="font-semibold">Role:</span> <span className="capitalize">{user?.role}</span></p>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
      {/* Later, add charts here! */}
    </div>
  );
}
