import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  console.log(tasks);

  return (
    <TaskContext.Provider value={{ tasks, loading, error, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
