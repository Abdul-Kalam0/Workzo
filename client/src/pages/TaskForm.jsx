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

  const { projects } = useProjects();
  const { teams } = useTeams();
  const { users } = useUsers();
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

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleOwnersChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (o) => o.value);
    setForm((p) => ({ ...p, owners: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${BASE_URL}/tasks`,
        {
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()),
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

  return (
    <>
      <Navbar />

      <main className="container my-5" style={{ minHeight: "70vh" }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4 className="fw-bold mb-4">Create Task</h4>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Project</label>
                      <select
                        name="project"
                        className="form-select"
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
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Team</label>
                      <select
                        name="team"
                        className="form-select"
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
                    </div>

                    <div className="col-md-12">
                      <label className="form-label fw-semibold">Owners</label>
                      <select
                        multiple
                        className="form-select"
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
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Task Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Time (days)
                      </label>
                      <input
                        type="number"
                        name="timeToComplete"
                        className="form-control"
                        value={form.timeToComplete}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Tags</label>
                      <input
                        type="text"
                        name="tags"
                        className="form-control"
                        placeholder="frontend, api"
                        value={form.tags}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Status</label>
                      <select
                        name="status"
                        className="form-select"
                        value={form.status}
                        onChange={handleChange}
                      >
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  {error && (
                    <div className="alert alert-danger mt-3">{error}</div>
                  )}

                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create Task"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};
