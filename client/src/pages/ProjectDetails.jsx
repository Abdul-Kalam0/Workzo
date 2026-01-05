import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useProjects } from "../context/ProjectContext";

export const ProjectDetails = () => {
  const { pId } = useParams();
  const navigate = useNavigate();

  const { projectDetails, loadingById, errorById, fetchProjectById } =
    useProjects();

  useEffect(() => {
    fetchProjectById(pId);
  }, [pId]);

  return (
    <>
      <Navbar />

      <main className="container my-5" style={{ minHeight: "70vh" }}>
        {/* Loading */}
        {loadingById && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" />
            <p className="mt-2">Loading project details...</p>
          </div>
        )}

        {/* Error */}
        {errorById && (
          <div className="alert alert-danger text-center">{errorById}</div>
        )}

        {/* Details */}
        {!loadingById && projectDetails && (
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  {/* Status */}
                  <span
                    className={`badge rounded-pill mb-3 ${
                      projectDetails.status === "Completed"
                        ? "bg-success-subtle text-success"
                        : "bg-warning-subtle text-warning"
                    }`}
                  >
                    {projectDetails.status}
                  </span>

                  {/* Title */}
                  <h3 className="fw-bold mb-3">{projectDetails.name}</h3>

                  {/* Description */}
                  <p className="text-muted mb-4">
                    {projectDetails.description || "No description provided."}
                  </p>

                  {/* Meta */}
                  <div className="row g-3">
                    <div className="col-6">
                      <small className="text-muted">Created On</small>
                      <p className="fw-semibold mb-0">
                        {new Date(projectDetails.createdAt).toLocaleDateString(
                          "en-GB",
                          { day: "2-digit", month: "short", year: "numeric" }
                        )}
                      </p>
                    </div>

                    <div className="col-6">
                      <small className="text-muted">Project ID</small>
                      <p className="fw-semibold mb-0">{projectDetails._id}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mt-4">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate(-1)}
                    >
                      ← Back
                    </button>

                    <Link
                      to={`/projects/${projectDetails._id}/edit`}
                      className="btn btn-primary"
                    >
                      Edit Project
                    </Link>
                  </div>
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
