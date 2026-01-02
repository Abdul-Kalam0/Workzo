import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/users`, {
        withCredentials: true,
      });
      setUsers(res.data.users);
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [BASE_URL]);

  return (
    <UserContext.Provider value={{ users, loading, error, fetchAllUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
