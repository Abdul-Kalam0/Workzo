import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useTasks } from "../context/TaskContext";

export const TaskDetails = () => {
  const { tId } = useParams();
  const navigate = useNavigate();

  const { taskDetails, loadingById, errorById, fetchTaskById } = useTasks();

  useEffect(() => {
    fetchTaskById(tId);
  }, [tId]);

  return (
    <>
      <Navbar />

      <main className="container my-5" style={{ minHeight: "70vh" }}>
        {/* Loading */}
        {loadingById && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" />
            <p className="mt-2">Loading task details...</p>
          </div>
        )}

        {/* Error */}
        {errorById && (
          <div className="alert alert-danger text-center">{errorById}</div>
        )}

        {/* Details */}
        {!loadingById && taskDetails && (
          <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-7">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  {/* Status */}
                  <span
                    className={`badge rounded-pill mb-3 ${
                      taskDetails.status === "Completed"
                        ? "bg-success-subtle text-success"
                        : "bg-warning-subtle text-warning"
                    }`}
                  >
                    {taskDetails.status}
                  </span>

                  {/* ================= TOP HEADER ================= */}
                  <div className="mb-4">
                    <small className="text-muted">Task Name</small>
                    <h3 className="fw-bold">{taskDetails.name}</h3>
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <small className="text-muted">Project Name</small>
                      <p className="fw-semibold mb-0">
                        {taskDetails.project?.name || "—"}
                      </p>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">Team Name</small>
                      <p className="fw-semibold mb-0">
                        {taskDetails.team?.name || "—"}
                      </p>
                    </div>
                  </div>

                  {/* ================= META ================= */}
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <small className="text-muted">Time to Complete</small>
                      <p className="fw-semibold mb-0">
                        {taskDetails.timeToComplete} days
                      </p>
                    </div>

                    <div className="col-md-6">
                      <small className="text-muted">Created On</small>
                      <p className="fw-semibold mb-0">
                        {new Date(taskDetails.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  {/* ================= OWNERS + TAGS ================= */}
                  <div className="row mb-4">
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
                      <small className="text-muted">Tags</small>
                      <div className="d-flex flex-wrap gap-2 mt-1">
                        {taskDetails.tags?.length > 0 ? (
                          taskDetails.tags.map((t, i) => (
                            <span
                              key={i}
                              className="badge bg-secondary-subtle text-secondary"
                            >
                              #{t}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ================= ACTIONS ================= */}
                  <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mt-4">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate(-1)}
                    >
                      ← Back
                    </button>

                    <Link
                      to={`/tasks/${taskDetails._id}/edit`}
                      className="btn btn-primary"
                    >
                      Edit Task
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
