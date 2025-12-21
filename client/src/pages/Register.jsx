import { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Register = () => {
  const navigate = useNavigate();
  const { signup, error } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      await signup(form);
      navigate("/login");
    } catch {
      // error is already handled by AuthContext
    }
  };

  return (
    <>
      <Navbar />

      <main className="container mt-5" style={{ maxWidth: "400px" }}>
        <h2 className="mb-4">Create an Account</h2>

        <form onSubmit={handleForm}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              name="name"
              placeholder="Enter your name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>

          {/* Error message */}
          {error && <p className="text-danger mt-2 text-center">{error}</p>}
        </form>

        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </main>

      <Footer />
    </>
  );
};
