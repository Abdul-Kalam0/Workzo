import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useProjects } from "../context/ProjectContext";
import { useNavigate, useParams } from "react-router-dom";

/* ✅ TOAST */
import { toast } from "react-toastify";

export const ProjectEdit = () => {
  const navigate = useNavigate();
  const { pId } = useParams();

  const [form, setForm] = useState({
    name: "",
    status: "",
    description: "",
  });

  const {
    projectDetails,
    loadingById,
    errorById,
    fetchProjectById,
    updateProjectById,
  } = useProjects();

  useEffect(() => {
    fetchProjectById(pId);
  }, [pId]);

  useEffect(() => {
    if (projectDetails) {
      setForm({
        name: projectDetails.name || "",
        status: projectDetails.status || "",
        description: projectDetails.description || "",
      });
    }
  }, [projectDetails]);

  /* ✅ ERROR TOAST */
  useEffect(() => {
    if (errorById) {
      toast.error(errorById);
    }
  }, [errorById]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProjectById(pId, form);
      toast.success("Project updated successfully");
      navigate(`/projects/${pId}`);
    } catch {
      toast.error("Failed to update project");
    }
  };

  return (
    <>
      <Navbar />

      <main className="container my-5" style={{ minHeight: "70vh" }}>
        {loadingById && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" />
            <p className="mt-2">Loading project...</p>
          </div>
        )}

        {errorById && (
          <div className="alert alert-danger text-center">{errorById}</div>
        )}

        {!loadingById && projectDetails && (
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h4 className="fw-bold mb-4">Edit Project</h4>

                  <form onSubmit={handleSubmit}>
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

                    <div className="mb-4">
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

                    <div className="d-flex justify-content-end gap-2">
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
