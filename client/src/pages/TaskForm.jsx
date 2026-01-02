import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useProjects } from "../context/ProjectContext";
import { useUsers } from "../context/UserContext";
import { useTasks } from "../context/TaskContext";
import { useTeams } from "../context/TeamContext";

export const TaskForm = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const {
    projects,
    loading: projectLoading,
    error: projectError,
  } = useProjects();

  const { teams, loading: teamLoading, error: teamError } = useTeams();

  const { users, loading: userLoading, error: userError } = useUsers();
  const { fetchTasks } = useTasks();

  const [form, setForm] = useState({
    name: "",
    project: "",
    team: "",
    owners: [],
    tags: "",
    timeToComplete: "",
    status: "In Progress",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- Handlers ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOwnersChange = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setForm((prev) => ({ ...prev, owners: selected }));
  };

  /* ---------------- Submit ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${BASE_URL}/tasks`,
        {
          ...form,
          tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
          timeToComplete: Number(form.timeToComplete),
        },
        { withCredentials: true }
      );
      await fetchTasks();
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Loading / Error ---------------- */

  if (projectLoading || teamLoading || userLoading) {
    return <p>Loading form data...</p>;
  }

  if (projectError || teamError || userError) {
    return <p>Failed to load dropdown data.</p>;
  }

  /* ---------------- UI ---------------- */

  return (
    <>
      <Navbar />

      <main className="container mt-4">
        <h3>Create Task</h3>

        <form onSubmit={handleSubmit}>
          {/* Project */}
          <label className="form-label">Project</label>
          <select
            className="form-select"
            name="project"
            value={form.project}
            onChange={handleChange}
            required
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Team */}
          <label className="form-label mt-3">Team</label>
          <select
            className="form-select"
            name="team"
            value={form.team}
            onChange={handleChange}
            required
          >
            <option value="">Select Team</option>
            {teams.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>

          {/* Owners */}
          <label className="form-label mt-3">Owners</label>
          <select
            className="form-select"
            multiple
            value={form.owners}
            onChange={handleOwnersChange}
            required
          >
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>

          {/* Task Name */}
          <input
            type="text"
            name="name"
            placeholder="Task Name"
            className="form-control mt-3"
            value={form.name}
            onChange={handleChange}
            required
          />

          {/* Tags */}
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            className="form-control mt-3"
            value={form.tags}
            onChange={handleChange}
          />

          {/* Time */}
          <input
            type="number"
            name="timeToComplete"
            placeholder="Time to Complete (days)"
            className="form-control mt-3"
            value={form.timeToComplete}
            onChange={handleChange}
            required
          />

          {/* Status */}
          <select
            name="status"
            className="form-select mt-3"
            value={form.status}
            onChange={handleChange}
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {error && <div className="alert alert-danger mt-2">{error}</div>}

          <button className="btn btn-primary mt-3" disabled={loading}>
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
};
