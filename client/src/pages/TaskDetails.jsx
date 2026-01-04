import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useTasks } from "../context/TaskContext";

export const TaskDetails = () => {
  const { tId } = useParams();

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
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-2">Loading task details...</p>
          </div>
        )}

        {/* Error */}
        {errorById && (
          <div className="alert alert-danger text-center">{errorById}</div>
        )}

        {/* Task Details */}
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

                  {/* Title */}
                  <h3 className="fw-bold mb-3">{taskDetails.name}</h3>

                  {/* Meta Info */}
                  <div className="row g-3 mb-4">
                    <div className="col-6">
                      <small className="text-muted">Project</small>
                      <p className="fw-semibold mb-0">
                        {taskDetails.project?.name}
                      </p>
                    </div>

                    <div className="col-6">
                      <small className="text-muted">Team</small>
                      <p className="fw-semibold mb-0">
                        {taskDetails.team?.name}
                      </p>
                    </div>

                    <div className="col-6">
                      <small className="text-muted">Time to Complete</small>
                      <p className="fw-semibold mb-0">
                        {taskDetails.timeToComplete} days
                      </p>
                    </div>

                    <div className="col-6">
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

                  {/* Owners */}
                  <div className="mb-4">
                    <h6 className="fw-semibold">Owners</h6>
                    <div className="d-flex flex-wrap gap-2">
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

                  {/* Tags */}
                  <div>
                    <h6 className="fw-semibold">Tags</h6>
                    <div className="d-flex flex-wrap gap-2">
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
                        <p className="text-muted mb-0">No tags available</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <button className="btn btn-outline-primary btn-sm">
                      Edit Task
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      Back
                    </button>
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
