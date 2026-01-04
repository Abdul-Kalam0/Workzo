import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer";
import { Link } from "react-router-dom";
import { useProjects } from "./context/ProjectContext.jsx";
import { useTasks } from "./context/TaskContext.jsx";

function App() {
  const LIMIT = 4;

  const [projectFilterValue, setProjectFilterValue] = useState("");
  const [taskFilterValue, setTaskFilterValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    projects,
    loading: projectLoading,
    error: projectError,
    deleteProjectById,
  } = useProjects();

  const {
    tasks,
    loading: taskLoading,
    error: taskError,
    deleteTaskById,
  } = useTasks();

  /* ================= FILTER + SEARCH + LIMIT ================= */

  const filteredProjects = projects
    .filter((p) =>
      projectFilterValue ? p.status === projectFilterValue : true
    )
    .filter((p) =>
      searchTerm
        ? `${p.name} ${p.description}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        : true
    )
    .slice(0, LIMIT);

  const filteredTasks = tasks
    .filter((t) => (taskFilterValue ? t.status === taskFilterValue : true))
    .filter((t) =>
      searchTerm
        ? t.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    )
    .slice(0, LIMIT);

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* ================= PROJECTS ================= */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-3">
            <h2 className="fw-bold mb-0">Projects</h2>

            <select
              className="form-select form-select-sm"
              style={{ width: "140px" }}
              value={projectFilterValue}
              onChange={(e) => setProjectFilterValue(e.target.value)}
            >
              <option value="">Filter</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <Link to="/project-form" className="btn btn-primary btn-sm">
            + New Project
          </Link>
        </div>

        {projectError && (
          <div className="alert alert-danger">{projectError}</div>
        )}

        {projectLoading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" />
          </div>
        ) : (
          <div className="row">
            {filteredProjects.map((pj) => (
              <div
                key={pj._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <div
                  className="card h-100 border-0 shadow-sm bg-light"
                  style={{ minHeight: "230px", borderRadius: "14px" }}
                >
                  <div className="card-body d-flex flex-column">
                    <span
                      className={`badge rounded-pill mb-2 align-self-start ${
                        pj.status === "Completed"
                          ? "bg-success-subtle text-success"
                          : "bg-warning-subtle text-warning"
                      }`}
                    >
                      {pj.status}
                    </span>

                    <h6 className="fw-semibold text-truncate">{pj.name}</h6>

                    <p className="text-muted small flex-grow-1 text-truncate">
                      {pj.description}
                    </p>

                    <div className="d-flex justify-content-between mt-auto">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteProjectById(pj._id)}
                      >
                        Delete
                      </button>
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
            ))}
          </div>
        )}

        {/* ================= TASKS ================= */}
        <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
          <div className="d-flex align-items-center gap-3">
            <h2 className="fw-bold mb-0">My Tasks</h2>

            <select
              className="form-select form-select-sm"
              style={{ width: "140px" }}
              value={taskFilterValue}
              onChange={(e) => setTaskFilterValue(e.target.value)}
            >
              <option value="">Filter</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <Link to="/task-form" className="btn btn-primary btn-sm">
            + New Task
          </Link>
        </div>

        {taskError && <div className="alert alert-danger">{taskError}</div>}

        {taskLoading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" />
          </div>
        ) : (
          <div className="row">
            {filteredTasks.map((tk) => {
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
                    style={{ minHeight: "230px", borderRadius: "14px" }}
                  >
                    <div className="card-body d-flex flex-column">
                      <span
                        className={`badge rounded-pill mb-2 align-self-start ${
                          tk.status === "Completed"
                            ? "bg-success-subtle text-success"
                            : "bg-warning-subtle text-warning"
                        }`}
                      >
                        {tk.status}
                      </span>

                      <h6 className="fw-semibold mb-1 text-truncate">
                        {tk.name}
                      </h6>

                      {/* Due Date */}
                      <p className="text-muted small mb-2 mt-2">
                        Due on:{" "}
                        {dueDate.toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>

                      {/* Owners */}
                      <div className="d-flex align-items-center gap-2 mb-3 mt-1">
                        {tk.owners?.slice(0, 1).map((o, i) => (
                          <>
                            <div
                              className="rounded-circle bg-warning d-flex align-items-center justify-content-center fw-semibold"
                              style={{
                                width: "34px",
                                height: "34px",
                                fontSize: "14px",
                              }}
                              key={i}
                            >
                              {o.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </div>

                            <span className="small fw-semibold text-muted">
                              {o.name}
                            </span>
                          </>
                        ))}

                        {tk.owners?.length > 1 && (
                          <span className="small text-muted">
                            +{tk.owners.length - 1}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="d-flex justify-content-between mt-auto">
                        <button
                          onClick={() => deleteTaskById(tk._id)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          Delete
                        </button>
                        <Link
                          to={`/tasks/${tk._id}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
