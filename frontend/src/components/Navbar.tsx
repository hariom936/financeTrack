import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null; // Hide navbar if not logged in

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between">
      {/* Logo or Placeholder */}
      <div className="w-1/3" />

      {/* Center Nav Links */}
      <div className="flex justify-center space-x-6 w-1/3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "font-bold underline"
              : "hover:underline"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            isActive
              ? "font-bold underline"
              : "hover:underline"
          }
        >
          Transactions
        </NavLink>
        {(user.role === "admin" || user.role === "user") && (
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive
                ? "font-bold underline"
                : "hover:underline"
            }
          >
            Categories
          </NavLink>
        )}
      </div>

      {/* Logout on the Right */}
      <div className="flex items-center justify-end w-1/3 gap-4">
        <span className="text-sm capitalize">{user.role}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
