import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useProjects } from "../contexts/ProjectContext";

export const Projects = () => {
  const { projects, loading, error } = useProjects();
  const [projectFilterValue, setProjectFilterValue] = useState(null);
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
        <div className="d-flex justify-content-between align-items-center">
          {/* left section */}
          <div className="d-flex align-items-center gap-3">
            <div>
              <h2>Projects</h2>
            </div>
            <div>
              <select onChange={handleSelect} className="btn btn-light">
                <option value="">Filter</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          {/* right section */}

          <div className="d-flex">
            <Link to="/project-form" className="btn btn-primary">
              +New Projects
            </Link>
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="row">
            {filteredProjects.map((pj) => (
              <div className="col-4 col-md-4">
                <div className="card mb-4">
                  <div className="card-body" style={{ height: "200px" }}>
                    <p>{pj.status}</p>
                    <h4>{pj.name}</h4>
                    <p>{pj.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        className="btn btn-danger"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Delete
                      </Link>
                      <Link
                        className="btn btn-success"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Show
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Projects not found.</p>
        )}
      </main>
      <Footer />
    </>
  );
};
