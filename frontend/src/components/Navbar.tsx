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

  if (!user) return null; // hide navbar if not logged in

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex gap-4">
        <NavLink to="/dashboard" className={({isActive}) => isActive ? "font-bold underline" : ""}>
          Dashboard
        </NavLink>
        <NavLink to="/transactions" className={({isActive}) => isActive ? "font-bold underline" : ""}>
          Transactions
        </NavLink>
        {(user.role === "admin" || user.role === "user") && (
          <NavLink to="/categories" className={({isActive}) => isActive ? "font-bold underline" : ""}>
            Categories
          </NavLink>
        )}
      </div>
      <div className="flex items-center gap-4">
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
