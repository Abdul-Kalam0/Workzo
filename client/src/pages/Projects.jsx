import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import axios from "axios";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchedProjects = async () => {
      const res = await axios.get(`${BASE_URL}/projects`, {
        withCredentials: true,
      });
      setProjects(res.data.projects);
      setLoading(false);
    };
    fetchedProjects();
  }, [BASE_URL]);
  return (
    <>
      <Navbar />
      <main className="container mt-4">
        {projects.length > 0 ? (
          <div className="row">
            {projects.map((pj) => (
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
                        Details
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
