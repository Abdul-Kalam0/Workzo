import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer";
import { Link, useParams } from "react-router-dom";
import { useProjects } from "./context/ProjectContext.jsx";
import { useTasks } from "./context/TaskContext.jsx";

function App() {
  

  const [projectFilterValue, setProjectFilterValue] = useState("");
  const [taskFilterValue, setTaskFilterValue] = useState("");

  const {
    projects,
    loading: projectLoading,
    error: projectError,
  } = useProjects();

  const { tasks, loading: taskLoading, error: taskError } = useTasks();

  const filteredProjects = projectFilterValue
    ? projects.filter((p) => p.status === projectFilterValue).slice(0, 4)
    : projects.slice(0, 4);

  const filteredTasks = taskFilterValue
    ? tasks.filter((t) => t.status === taskFilterValue)
    : tasks;

  return (
    <>
      <Navbar />

      <main className="container my-4" style={{ minHeight: "75vh" }}>
        {/* ================= SEARCH ================= */}
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search projects or tasks..."
            />
          </div>
        </div>

        {/* ================= PROJECTS ================= */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
          <h2 className="fw-bold">Projects</h2>

          <div className="d-flex gap-2">
            <select
              className="form-select form-select-sm"
              onChange={(e) => setProjectFilterValue(e.target.value)}
            >
              <option value="">All</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <Link to="/project-form" className="btn btn-primary btn-sm">
              + New Project
            </Link>
          </div>
        </div>

        {projectError && (
          <div className="alert alert-danger">{projectError}</div>
        )}

        {projectLoading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" />
            <p className="mt-2">Loading projects...</p>
          </div>
        ) : (
          <div className="row">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((pj) => (
                <div
                  key={pj._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                >
                  <div
                    className="card h-100 border-0 shadow-sm bg-light"
                    style={{ minHeight: "230px" }}
                  >
                    <div className="card-body d-flex flex-column">
                      <span
                        className={`badge rounded-pill align-self-start mb-2 ${
                          pj.status === "Completed"
                            ? "bg-success-subtle text-success"
                            : "bg-warning-subtle text-warning"
                        }`}
                      >
                        {pj.status}
                      </span>

                      <h6 className="fw-semibold mb-2 text-truncate">
                        {pj.name}
                      </h6>

                      <p className="text-muted small flex-grow-1 text-truncate">
                        {pj.description}
                      </p>

                      <div className="d-flex justify-content-between mt-auto">
                        <Link className="btn btn-outline-danger btn-sm">
                          Delete
                        </Link>
                        <Link
                          to={`/projects/${pj._id}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No projects found.</p>
            )}
          </div>
        )}

        {/* ================= TASKS ================= */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mt-5 mb-3">
          <h2 className="fw-bold">My Tasks</h2>

          <div className="d-flex gap-2">
            <select
              className="form-select form-select-sm"
              onChange={(e) => setTaskFilterValue(e.target.value)}
            >
              <option value="">All</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <Link to="/task-form" className="btn btn-primary btn-sm">
              + New Task
            </Link>
          </div>
        </div>

        {taskError && <div className="alert alert-danger">{taskError}</div>}

        {taskLoading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" />
            <p className="mt-2">Loading tasks...</p>
          </div>
        ) : (
          <div className="row">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((tk) => {
                const dueDate = new Date(
                  new Date(tk.createdAt).getTime() +
                    tk.timeToComplete * 24 * 60 * 60 * 1000
                );

                return (
                  <div
                    key={tk._id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                  >
                    <div
                      className="card h-100 border-0 shadow-sm bg-light"
                      style={{ minHeight: "230px" }}
                    >
                      <div className="card-body d-flex flex-column">
                        <span
                          className={`badge rounded-pill align-self-start mb-2 ${
                            tk.status === "Completed"
                              ? "bg-success-subtle text-success"
                              : "bg-warning-subtle text-warning"
                          }`}
                        >
                          {tk.status}
                        </span>

                        <h6 className="fw-semibold mb-2 text-truncate">
                          {tk.name}
                        </h6>

                        <p className="text-muted small mb-2">
                          Due on:{" "}
                          {dueDate.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>

                        {/* Owners */}
                        <div className="d-flex align-items-center mb-3">
                          {tk.owners?.slice(0, 2).map((o, i) => (
                            <div
                              key={o._id}
                              className={`rounded-circle d-flex align-items-center justify-content-center text-white fw-semibold me-n2 ${
                                i === 0 ? "bg-warning" : "bg-success"
                              }`}
                              style={{
                                width: "28px",
                                height: "28px",
                                fontSize: "12px",
                                border: "2px solid white",
                              }}
                            >
                              {o.name[0]}
                            </div>
                          ))}

                          {tk.owners?.length > 2 && (
                            <div
                              className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-semibold ms-1"
                              style={{
                                width: "28px",
                                height: "28px",
                                fontSize: "12px",
                                border: "2px solid white",
                              }}
                            >
                              +{tk.owners.length - 2}
                            </div>
                          )}
                        </div>

                        <div className="d-flex justify-content-between mt-auto">
                          <button className="btn btn-outline-danger btn-sm">
                            Delete
                          </button>
                          <button className="btn btn-outline-primary btn-sm">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No tasks found.</p>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
