import { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

export const Tasks = () => {
  const [taskFilterValue, setTaskFilterValue] = useState("");
  const { tasks, loading, error } = useTasks();

  const filteredTasks = taskFilterValue
    ? tasks.filter((tk) => tk.status === taskFilterValue)
    : tasks;

  return (
    <>
      <Navbar />

      <main className="container mt-4">
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-3">
            <h3 className="mb-0">Tasks</h3>

            <select
              className="form-select form-select-sm w-auto"
              onChange={(e) => setTaskFilterValue(e.target.value)}
            >
              <option value="">Filter</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <Link to="/task-form" className="btn btn-primary">
            + New Task
          </Link>
        </div>

        {/* Table */}
        {filteredTasks.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>TASK</th>
                  <th>OWNER</th>
                  <th>PROJECT</th>
                  <th>TEAM</th>
                  <th>STATUS</th>
                  <th>CREATED ON</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredTasks.map((tk) => (
                  <tr key={tk._id}>
                    {/* Task Name */}
                    <td>
                      <strong>{tk.name}</strong>
                      {tk.tags?.length > 0 && (
                        <div className="mt-1">
                          {tk.tags.map((tag) => (
                            <span
                              key={tag}
                              className="badge bg-light text-dark me-1"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Owners */}
                    <td>{tk.owners?.map((o) => o.name).join(", ") || "—"}</td>

                    {/* Project */}
                    <td>{tk.project?.name || "—"}</td>

                    {/* Team */}
                    <td>{tk.team?.name || "—"}</td>

                    {/* Status */}
                    <td>
                      <span
                        className={`badge ${
                          tk.status === "Completed"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {tk.status}
                      </span>
                    </td>

                    {/* Created At */}
                    <td>
                      {new Date(tk.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    {/* Action */}
                    <td className="text-end">
                      <Link
                        to={`/tasks/${tk._id}`}
                        className="text-decoration-none fw-bold"
                      >
                        →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Tasks not found.</p>
        )}
      </main>

      <Footer />
    </>
  );
};
