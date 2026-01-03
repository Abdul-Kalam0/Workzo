import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useProjects } from "../context/ProjectContext";

export const Projects = () => {
  const { projects, loading, error } = useProjects();
  const [projectFilterValue, setProjectFilterValue] = useState("");

  const handleSelect = (e) => {
    setProjectFilterValue(e.target.value);
  };

  const filteredProjects = projectFilterValue
    ? projects.filter((p) => p.status === projectFilterValue)
    : projects;

  return (
    <>
      <Navbar />

      <main className="container mt-4">
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-3">
            <h3 className="mb-0">Projects</h3>

            <select
              onChange={handleSelect}
              className="form-select form-select-sm w-auto"
            >
              <option value="">Filter</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <Link to="/project-form" className="btn btn-primary">
            + New Project
          </Link>
        </div>

        {/* Table */}
        {filteredProjects.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>PROJECT</th>
                  <th>DESCRIPTION</th>
                  <th>STATUS</th>
                  <th>CREATED ON</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredProjects.map((pj) => (
                  <tr key={pj._id}>
                    {/* Project Name */}
                    <td>
                      <strong>{pj.name}</strong>
                    </td>

                    {/* Description */}
                    <td className="text-muted">{pj.description}</td>

                    {/* Status */}
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

                    {/* Created Date */}
                    <td>
                      {new Date(pj.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    {/* Action */}
                    <td className="text-end">
                      <Link
                        to={`/projects/${pj._id}`}
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
          <p>Projects not found.</p>
        )}
      </main>

      <Footer />
    </>
  );
};
