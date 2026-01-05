import { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* ✅ TOAST */
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const { login, error } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form);
      toast.success("Login successful");
      navigate("/");
    } catch {
      toast.error(error || "Login failed");
    }
  };

  return (
    <>
      <Navbar />

      <main className="container my-5" style={{ minHeight: "70vh" }}>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-6 col-lg-4">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                {/* Title */}
                <h4 className="fw-bold mb-4 text-center">
                  Login to your account
                </h4>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Error (kept for fallback UX) */}
                  {error && (
                    <div className="alert alert-danger py-2 text-center">
                      {error}
                    </div>
                  )}

                  {/* Action */}
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </form>

                {/* Register CTA */}
                <p className="text-center mt-3 mb-0">
                  New to <span className="fw-semibold">Workzo</span>?{" "}
                  <span
                    className="fw-semibold text-primary"
                    role="button"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};
