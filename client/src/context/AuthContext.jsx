import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // 🔍 Check auth on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/auth/me`, {
          withCredentials: true,
        });
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
  }, [BASE_URL]);

  // 📝 SIGNUP
  const signup = async (data) => {
    try {
      setError(null);
      await axios.post(`${BASE_URL}/auth/signup`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      setError(message);
      throw error;
    }
  };

  // 🔐 LOGIN
  const login = async (credentials) => {
    try {
      setError(null);
      await axios.post(`${BASE_URL}/auth/login`, credentials, {
        withCredentials: true,
      });
      setIsLoggedIn(true);
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      setError(message);
      throw error;
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        error,
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
