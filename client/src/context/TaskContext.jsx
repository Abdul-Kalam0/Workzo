import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [taskDetails, setTaskDetails] = useState(null);
  const [loadingById, setLoadingById] = useState(true);
  const [errorById, setErrorById] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/tasks`, {
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
  }, [BASE_URL]);

  const fetchTaskById = async (tId) => {
    try {
      const res = await axios.get(`${BASE_URL}/tasks/${tId}`);
      setTaskDetails(res.data.task);
    } catch (error) {
      setErrorById(error.response.data.message || "Something went wrong");
    } finally {
      setLoadingById(false);
    }
  };

  const deleteTaskById = async (tId) => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${tId}`, {
        withCredentials: true,
      });
      await fetchTasks();
    } catch (error) {
      console.error("Failed to delete task");
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
