import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [projectDetails, setProjectDetails] = useState(null);
  const [loadingById, setLoadingById] = useState(false);
  const [errorById, setErrorById] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  /* ================= FETCH ALL PROJECTS ================= */
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${BASE_URL}/projects`, {
        withCredentials: true,
      });

      setProjects(res.data.projects);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [BASE_URL]);

  /* ================= FETCH PROJECT BY ID ================= */
  const fetchProjectById = async (pId) => {
    try {
      setLoadingById(true);
      setErrorById(null);

      const res = await axios.get(`${BASE_URL}/projects/${pId}`, {
        withCredentials: true,
      });

      setProjectDetails(res.data.project);
    } catch (err) {
      setErrorById(err?.response?.data?.message || "Project not found");
    } finally {
      setLoadingById(false);
    }
  };

  /* ================= DELETE PROJECT ================= */
  const deleteProjectById = async (pId) => {
    try {
      await axios.delete(`${BASE_URL}/projects/${pId}`, {
        withCredentials: true,
      });

      // refresh project list after delete
      await fetchProjects();
    } catch (err) {
      console.error("Failed to delete project");
    }
  };
  /* ================= UPDATE PROJECT BY ID ================= */
  const updateProjectById = async (pId, updateData) => {
    try {
      await axios.put(`${BASE_URL}/projects/${pId}`, updateData, {
        withCredentials: true,
      });
      await fetchProjectById(pId);
      await fetchProjects();
    } catch (error) {
      console.error("Failed to update project");
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
        fetchProjects,

        projectDetails,
        loadingById,
        errorById,
        fetchProjectById,

        deleteProjectById, // ✅ exposed

        updateProjectById,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

// custom hook (BEST PRACTICE)
export const useProjects = () => useContext(ProjectContext);
