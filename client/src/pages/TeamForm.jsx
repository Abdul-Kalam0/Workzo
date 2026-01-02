import { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTeams } from "../context/TeamContext";

export const TeamForm = () => {
  const navigate = useNavigate();
  const { fetchTeams } = useTeams();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setError(null);

    try {
      await axios.post(`${BASE_URL}/teams`, form, {
        withCredentials: true,
      });

      setForm({ name: "", description: "" });

      await fetchTeams(); // refresh list
      navigate("/teams");
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
          <div className="mb-3">
            <label className="form-label">Team Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              required
              placeholder="Enter team name"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Team Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={form.description}
              required
              placeholder="Enter team description"
              onChange={handleChange}
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating team..." : "Create team"}
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
};
