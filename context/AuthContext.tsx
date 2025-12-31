"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  setAuthState: (user: User) => void;
  clearAuthState: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const userCookie = cookies.find((c) => c.trim().startsWith("user="));
    const tokenCookie = cookies.find((c) =>
      c.trim().startsWith("accessToken=")
    );

    if (userCookie && tokenCookie) {
      try {
        const userData = decodeURIComponent(userCookie.split("=")[1]);
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse user cookie:", error);
      }
    }
  }, []);

  const setAuthState = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
  };

  const clearAuthState = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthState, clearAuthState, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
