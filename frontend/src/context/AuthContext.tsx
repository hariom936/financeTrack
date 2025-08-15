import React, { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  email: string;
  name: string;
  role: "admin" | "user" | "read-only";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // 👈 Added

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decoded = jwtDecode<any>(savedToken);
        setUser({
          id: decoded.userId,
          email: decoded.email,
          name: decoded.name || "",
          role: decoded.role,
        });
        setToken(savedToken);
      } catch (err) {
        localStorage.removeItem("token"); // corrupt token fallback
      }
    }
    setLoading(false); // 👈 Done loading after token check
  }, []);

  const login = (jwtToken: string) => {
    localStorage.setItem("token", jwtToken);
    const decoded = jwtDecode<any>(jwtToken);
    setUser({
      id: decoded.userId,
      email: decoded.email,
      name: decoded.name || "",
      role: decoded.role,
    });
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
      {/* Optional: add loading spinner */}
      {loading && <div className="text-center p-4">Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
