import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/projects`, {
        withCredentials: true,
      });
      setProjects(res.data.projects);
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [BASE_URL]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
        fetchProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

// custom hook (BEST PRACTICE)
export const useProjects = () => useContext(ProjectContext);
