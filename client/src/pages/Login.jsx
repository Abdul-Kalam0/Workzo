import { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { login, error } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleEmail = (e) => {
    setForm((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePassword = (e) => {
    setForm((prev) => ({ ...prev, password: e.target.value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await login(form); // ✅ Auth handled by context
      navigate("/");
    } catch {
      // error already handled in AuthContext
    }
  };

  return (
    <>
      <Navbar />

      <main className="container">
        <h1>Log in to your account.</h1>

        <div>
          <form onSubmit={submitForm}>
            {/* email */}
            <label className="form-label">Email</label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter your email"
              value={form.email}
              required
              onChange={handleEmail}
            />
            <br />

            {/* password */}
            <label className="form-label">Password</label>
            <br />
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
              onChange={handlePassword}
            />
            <br />

            <button type="submit" className="btn btn-primary">
              Login
            </button>

            {/* error message */}
            {error && <p className="text-danger mt-2">{error}</p>}
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};
