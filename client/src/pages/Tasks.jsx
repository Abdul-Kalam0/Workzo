import { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

export const Tasks = () => {
  const [taskFilterValue, setTaskFilterValue] = useState("");
  const { tasks, loading, error } = useTasks();

  const filteredTasks = taskFilterValue
    ? tasks.filter((t) => t.status === taskFilterValue)
    : tasks;

  return (
    <>
      <Navbar />

      <main className="container my-4" style={{ minHeight: "70vh" }}>
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
          <div className="d-flex align-items-center gap-3">
            <h3 className="fw-bold mb-0">Tasks</h3>

            <select
              className="form-select form-select-sm w-auto"
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

        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && filteredTasks.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>TASK</th>
                  <th className="d-none d-md-table-cell">OWNER</th>
                  <th className="d-none d-lg-table-cell">PROJECT</th>
                  <th className="d-none d-lg-table-cell">TEAM</th>
                  <th>STATUS</th>
                  <th className="d-none d-md-table-cell">CREATED</th>
                  <th className="text-end">ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredTasks.map((tk) => (
                  <tr key={tk._id}>
                    <td className="fw-semibold">{tk.name}</td>

                    <td className="d-none d-md-table-cell">
                      {tk.owners?.map((o) => o.name).join(", ") || "—"}
                    </td>

                    <td className="d-none d-lg-table-cell">
                      {tk.project?.name || "—"}
                    </td>

                    <td className="d-none d-lg-table-cell">
                      {tk.team?.name || "—"}
                    </td>

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

                    <td className="d-none d-md-table-cell">
                      {new Date(tk.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    <td className="text-end">
                      <Link
                        to={`/tasks/${tk._id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && <p className="text-muted">Tasks not found.</p>
        )}
      </main>

      <Footer />
    </>
  );
};
