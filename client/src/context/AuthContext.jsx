import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔍 Check auth on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        setIsLoggedIn(true);
        setUser(res.data.user);
      } catch {
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 📝 SIGNUP
  const signup = async (data) => {
    await api.post(`/auth/signup`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return true;
  };

  // 🔐 LOGIN
  const login = async (credentials) => {
    const res = await api.post(`/auth/login`, credentials);
    setIsLoggedIn(true);
    setUser(res.data.user);
  };

  // 🚪 LOGOUT
  const logout = async () => {
    await api.post(`/auth/logout`);
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => useContext(AuthContext);
