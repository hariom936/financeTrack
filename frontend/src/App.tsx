import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import TransactionsPage from "./pages/TransactionsPage";
import CategoriesPage from "./pages/CategoriesPage";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const UnauthorizedPage = () => <h2>Unauthorized</h2>;

// Decide where to go when hitting "/"
function RootRedirect() {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Navbar now has router context */}
        
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected for all roles */}
            <Route element={<ProtectedRoute allowedRoles={["admin", "user", "read-only"]} />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
            </Route>

            {/* Protected for admin + user only */}
            <Route element={<ProtectedRoute allowedRoles={["admin", "user", "read-only"]} />}>
              <Route path="/categories" element={<CategoriesPage />} />
            </Route>

            {/* Error routes */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}
