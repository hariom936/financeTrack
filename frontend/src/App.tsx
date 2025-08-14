import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const UnauthorizedPage = () => <h2>Unauthorized</h2>;

function RootRedirect() {
  const { user } = useAuth();
  if (user) return <DashboardPage />;
  return <LoginPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute allowedRoles={["admin","user","read-only"]} />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>

            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}
