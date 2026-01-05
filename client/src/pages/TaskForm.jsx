import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

import { useProjects } from "../context/ProjectContext";
import { useTeams } from "../context/TeamContext";
import { useUsers } from "../context/UserContext";
import { useTasks } from "../context/TaskContext";

export const TaskForm = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  /* ================= CONTEXT DATA ================= */
  const { projects, loading: projectLoading } = useProjects();
  const { teams, loading: teamLoading } = useTeams();
  const { users, loading: userLoading } = useUsers();
  const { fetchTasks } = useTasks();

  /* ================= FORM STATE ================= */
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

  /* ================= LOADING GUARD ================= */
  if (projectLoading || teamLoading || userLoading) {
    return (
      <>
        <Navbar />
        <main
          className="container my-5 text-center"
          style={{ minHeight: "70vh" }}
        >
          <div className="spinner-border text-primary" />
          <p className="mt-2">Loading form data...</p>
        </main>
        <Footer />
      </>
    );
  }

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOwnersChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm((prev) => ({ ...prev, owners: selected }));
  };

  /* ================= SUBMIT ================= */
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
      setError(err?.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <>
      <Navbar />

      <main className="container my-5" style={{ minHeight: "70vh" }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4 text-center">Create Task</h4>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {/* Project */}
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

                    {/* Team */}
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

                    {/* Owners */}
                    <div className="col-12">
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

                    {/* Task Name */}
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

                    {/* Time */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Time to Complete (days)
                      </label>
                      <input
                        type="number"
                        name="timeToComplete"
                        className="form-control"
                        value={form.timeToComplete}
                        onChange={handleChange}
                        min="1"
                        required
                      />
                    </div>

                    {/* Tags */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Tags</label>
                      <input
                        type="text"
                        name="tags"
                        className="form-control"
                        placeholder="frontend, api, urgent"
                        value={form.tags}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Status */}
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

                  {/* Error */}
                  {error && (
                    <div className="alert alert-danger mt-3 text-center">
                      {error}
                    </div>
                  )}

                  {/* Actions */}
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
