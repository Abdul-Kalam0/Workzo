import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/axios";

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/teams`, {
        withCredentials: true,
      });
      setTeams(res.data.teams);
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to fetch teams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [BASE_URL]);

  const deleteTeamById = async (tId) => {
    try {
      await api.delete(`/teams/${tId}`);
      await fetchTeams();
    } catch (error) {
      throw error;
    }
  };

  return (
    <TeamContext.Provider
      value={{ teams, loading, error, fetchTeams, deleteTeamById }}
    >
      {children}
    </TeamContext.Provider>
  );
};

// ✅ custom hook
export const useTeams = () => useContext(TeamContext);
