import { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";

/* ✅ TOAST */
import { toast } from "react-toastify";

export const ProjectForm = () => {
  const navigate = useNavigate();
  const { createProject } = useProjects();

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "In Progress",
  });

  const [submitting, setSubmitting] = useState(false);

  /* ================= HANDLERS ================= */
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await createProject(form);
      toast.success("Project created successfully");
      navigate("/projects");
    } catch {
      toast.error("Failed to create project");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= UI ================= */
  return (
    <>
      <Navbar />

      <main className="container my-5" style={{ minHeight: "70vh" }}>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4 className="fw-bold mb-4">Create Project</h4>

                <form onSubmit={handleSubmit}>
                  {/* Name */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Project Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Status */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                    >
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  {/* Actions */}
                  <div className="d-flex justify-content-end gap-2">
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
                      disabled={submitting}
                    >
                      {submitting ? "Creating..." : "Create Project"}
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
