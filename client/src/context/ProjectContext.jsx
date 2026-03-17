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

  /* ================= FETCH ALL PROJECTS ================= */
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`/projects`, {
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

      const res = await axios.get(`/projects/${pId}`, {
        withCredentials: true,
      });

      setProjectDetails(res.data.project);
    } catch (err) {
      setErrorById(err?.response?.data?.message || "Project not found");
    } finally {
      setLoadingById(false);
    }
  };

  /* ================= UPDATE PROJECT ================= */
  const updateProjectById = async (pId, updateData) => {
    try {
      await axios.put(`/projects/${pId}`, updateData, {
        withCredentials: true,
      });

      await fetchProjectById(pId);
      await fetchProjects();
    } catch (err) {
      throw err;
    }
  };

  /* ================= DELETE PROJECT ================= */
  const deleteProjectById = async (pId) => {
    try {
      await axios.delete(`/projects/${pId}`, {
        withCredentials: true,
      });

      await fetchProjects();
    } catch (err) {
      throw err;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        /* list */
        projects,
        loading,
        error,
        fetchProjects,

        /* details */
        projectDetails,
        loadingById,
        errorById,
        fetchProjectById,

        /* actions */

        updateProjectById,
        deleteProjectById,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

/* ================= CUSTOM HOOK ================= */
export const useProjects = () => useContext(ProjectContext);
