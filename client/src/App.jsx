import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer";
import { Link } from "react-router-dom";
import { useProjects } from "./context/ProjectContext.jsx";
import { useTasks } from "./context/TaskContext.jsx";

import { toast } from "react-toastify";

function App() {
  const LIMIT = 4;

  const [projectFilterValue, setProjectFilterValue] = useState("");
  const [taskFilterValue, setTaskFilterValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  /* 🔴 DELETE MODAL STATE */
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteType, setDeleteType] = useState(""); // "project" | "task"
  const [deleteId, setDeleteId] = useState(null);

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

  /* ================= DELETE POPUP HANDLERS ================= */

  const openDeleteModal = (type, id) => {
    setDeleteType(type);
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteType("");
    setDeleteId(null);
  };

  const confirmDelete = async () => {
    try {
      if (deleteType === "project") {
        await deleteProjectById(deleteId);
        toast.success("Project deleted successfully");
      }

      if (deleteType === "task") {
        await deleteTaskById(deleteId);
        toast.success("Task deleted successfully");
      }
    } catch {
      toast.error("Delete failed");
    } finally {
      closeDeleteModal();
    }
  };

  /* ================= FILTER + SEARCH ================= */

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
              className="form-control"
              placeholder="Search projects or tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* ================= PROJECTS ================= */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold">Projects</h2>
          <Link to="/project-form" className="btn btn-primary btn-sm">
            + New Project
          </Link>
        </div>

        {projectLoading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" />
          </div>
        ) : (
          <div className="row">
            {filteredProjects.map((pj) => (
              <div key={pj._id} className="col-md-3 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body d-flex flex-column">
                    <h6 className="fw-semibold">{pj.name}</h6>
                    <p className="text-muted small flex-grow-1">
                      {pj.description}
                    </p>

                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => openDeleteModal("project", pj._id)}
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
        <h2 className="fw-bold mt-5 mb-3">My Tasks</h2>

        {taskLoading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" />
          </div>
        ) : (
          <div className="row">
            {filteredTasks.map((tk) => (
              <div key={tk._id} className="col-md-3 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body d-flex flex-column">
                    <h6 className="fw-semibold">{tk.name}</h6>

                    <div className="d-flex justify-content-between mt-auto">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => openDeleteModal("task", tk._id)}
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
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* ================= DELETE CONFIRM MODAL ================= */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Confirm Delete</h5>
                <button className="btn-close" onClick={closeDeleteModal} />
              </div>

              <div className="modal-body">
                <p className="mb-0">
                  Are you sure you want to delete this{" "}
                  <strong>{deleteType}</strong>? This action cannot be undone.
                </p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </>
  );
}

export default App;
