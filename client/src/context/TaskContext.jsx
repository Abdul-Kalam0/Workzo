import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/axios";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [taskDetails, setTaskDetails] = useState(null);
  const [loadingById, setLoadingById] = useState(true);
  const [errorById, setErrorById] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/tasks`, {
        withCredentials: true,
      });
      setTasks(res.data.tasks);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch Tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTaskById = async (tId) => {
    try {
      const res = await api.get(`/tasks/${tId}`);
      setTaskDetails(res.data.task);
    } catch (error) {
      setErrorById(error.response.data.message || "Something went wrong");
    } finally {
      setLoadingById(false);
    }
  };

  const deleteTaskById = async (tId) => {
    try {
      await api.delete(`/tasks/${tId}`, {
        withCredentials: true,
      });
      await fetchTasks();
    } catch (error) {
      console.error("Failed to delete task");
    }
  };

  const updateTaskById = async (tId, updatedData) => {
    try {
      await api.put(`/tasks/${tId}`, updatedData, {
        withCredentials: true,
      });
      fetchTaskById(tId); //refresh details
    } catch (error) {
      console.error("Failed to update task");
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        taskDetails,
        loadingById,
        errorById,
        fetchTaskById,

        deleteTaskById,

        updateTaskById,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
