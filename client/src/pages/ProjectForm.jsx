import { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";

export const ProjectForm = () => {
  const navigate = useNavigate();
  const { fetchProjects } = useProjects();

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "In Progress",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}/projects`, form, {
        withCredentials: true, // JWT stored in cookies
      });

      console.log("Project created:", res.data);

      // Reset form
      setForm({
        name: "",
        description: "",
        status: "In Progress",
      });

      //render the project
      await fetchProjects();
      // Redirect after success
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="container mt-4">
        <form onSubmit={handleSubmit}>
          {/* Project Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Project Name
            </label>
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="Enter project name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Project Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Project Description
            </label>
            <input
              id="description"
              type="text"
              className="form-control"
              placeholder="Enter project description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Project Status */}
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Project Status
            </label>
            <select
              id="status"
              className="form-select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Error Message */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
};
