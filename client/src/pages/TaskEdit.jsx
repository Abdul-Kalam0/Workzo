import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useTasks } from "../context/TaskContext";

/* ✅ TOAST */
import { toast } from "react-toastify";

export const TaskEdit = () => {
  const { tId } = useParams();
  const navigate = useNavigate();

  const { taskDetails, loadingById, errorById, fetchTaskById, updateTaskById } =
    useTasks();

  const [form, setForm] = useState({
    name: "",
    status: "",
    timeToComplete: "",
    tags: "",
  });

  /* ================= FETCH TASK ================= */
  useEffect(() => {
    fetchTaskById(tId);
  }, [tId]);

  /* ================= PREFILL FORM ================= */
  useEffect(() => {
    if (taskDetails) {
      setForm({
        name: taskDetails.name || "",
        status: taskDetails.status || "",
        timeToComplete: taskDetails.timeToComplete || "",
        tags: taskDetails.tags?.join(", ") || "",
      });
    }
  }, [taskDetails]);

  /* ================= ERROR TOAST ================= */
  useEffect(() => {
    if (errorById) {
      toast.error(errorById);
    }
  }, [errorById]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateTaskById(tId, {
        ...form,
        timeToComplete: Number(form.timeToComplete),
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
      });

      toast.success("Task updated successfully");
      navigate(`/tasks/${tId}`);
    } catch {
      toast.error("Failed to update task");
    }
  };

  /* ================= UI ================= */
  return (
    <>
      <Navbar />

      <main className="container my-5" style={{ minHeight: "70vh" }}>
        {loadingById && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" />
            <p className="mt-2">Loading task...</p>
          </div>
        )}

        {!loadingById && taskDetails && (
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h4 className="fw-bold mb-4">Edit Task</h4>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          Task Name
                        </label>
                        <input
                          className="form-control"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Status</label>
                        <select
                          className="form-select"
                          name="status"
                          value={form.status}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Status</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Time (days)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="timeToComplete"
                          value={form.timeToComplete}
                          onChange={handleChange}
                          min="1"
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-semibold">Tags</label>
                        <input
                          className="form-control"
                          name="tags"
                          value={form.tags}
                          onChange={handleChange}
                          placeholder="frontend, api"
                        />
                      </div>
                    </div>

                    <hr className="my-4" />

                    <div className="row g-3">
                      <div className="col-md-6">
                        <small className="text-muted">Project</small>
                        <p className="fw-semibold mb-0">
                          {taskDetails.project?.name}
                        </p>
                      </div>

                      <div className="col-md-6">
                        <small className="text-muted">Team</small>
                        <p className="fw-semibold mb-0">
                          {taskDetails.team?.name}
                        </p>
                      </div>

                      <div className="col-md-6">
                        <small className="text-muted">Owners</small>
                        <div className="d-flex flex-wrap gap-2 mt-1">
                          {taskDetails.owners?.map((o) => (
                            <span
                              key={o._id}
                              className="badge bg-light text-dark border"
                            >
                              {o.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <small className="text-muted">Created On</small>
                        <p className="fw-semibold mb-0">
                          {new Date(taskDetails.createdAt).toLocaleDateString(
                            "en-GB",
                            { day: "2-digit", month: "short", year: "numeric" }
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-4">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};
