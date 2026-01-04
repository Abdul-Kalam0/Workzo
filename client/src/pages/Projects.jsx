import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useProjects } from "../context/ProjectContext";

export const Projects = () => {
  const { projects, loading, error } = useProjects();
  const [projectFilterValue, setProjectFilterValue] = useState("");

  const filteredProjects = projectFilterValue
    ? projects.filter((p) => p.status === projectFilterValue)
    : projects;

  return (
    <>
      <Navbar />

      <main className="container my-4" style={{ minHeight: "70vh" }}>
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
          <div className="d-flex align-items-center gap-3">
            <h3 className="fw-bold mb-0">Projects</h3>

            <select
              className="form-select form-select-sm w-auto"
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

        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && filteredProjects.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>PROJECT</th>
                  <th className="d-none d-md-table-cell">DESCRIPTION</th>
                  <th>STATUS</th>
                  <th className="d-none d-lg-table-cell">CREATED</th>
                  <th className="text-end">ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredProjects.map((pj) => (
                  <tr key={pj._id}>
                    <td className="fw-semibold">{pj.name}</td>

                    <td className="text-muted d-none d-md-table-cell">
                      {pj.description || "—"}
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          pj.status === "Completed"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {pj.status}
                      </span>
                    </td>

                    <td className="d-none d-lg-table-cell">
                      {new Date(pj.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    <td className="text-end">
                      <Link
                        to={`/projects/${pj._id}`}
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
          !loading && <p className="text-muted">Projects not found.</p>
        )}
      </main>

      <Footer />
    </>
  );
};
