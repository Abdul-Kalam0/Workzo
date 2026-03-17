import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllUsers = async () => {
    try {
      const res = await api.get(`/auth/users`, {
        withCredentials: true,
      });

      // ✅ Defensive assignment
      setUsers(res.data?.users || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch users");
      setUsers([]); // never undefined
    } finally {
      setLoading(false);
    }
  };
  console.log("User context", users);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, loading, error, fetchAllUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
