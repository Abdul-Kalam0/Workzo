import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { isLoggedIn, loading, logout } = useAuth();
  const navigate = useNavigate();

  // Prevent flicker until auth status is known
  if (loading) return null;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      alert("Logout failed");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-4"
      style={{ backgroundColor: "#f3f1f8" }}
    >
      {/* Brand */}
      <Link className="navbar-brand fw-bold text-dark" to="/">
        Workzo
      </Link>

      {/* Mobile toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Nav items */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto gap-lg-3">
          <li className="nav-item">
            <NavLink
              className="nav-link d-flex gap-2 align-items-center text-dark"
              to="/"
            >
              <i className="bi bi-speedometer2 text-primary fs-5"></i>
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link d-flex gap-2 align-items-center text-dark"
              to="/projects"
            >
              <i className="bi bi-kanban fs-5" style={{ color: "#6f42c1" }}></i>
              Project
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link d-flex gap-2 align-items-center text-dark"
              to="/teams"
            >
              <i className="bi bi-people text-success fs-5"></i>
              Team
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link d-flex gap-2 align-items-center text-dark"
              to="/reports"
            >
              <i className="bi bi-bar-chart text-warning fs-5"></i>
              Reports
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link d-flex gap-2 align-items-center text-dark"
              to="/setting"
            >
              <i className="bi bi-gear text-secondary fs-5"></i>
              Settings
            </NavLink>
          </li>

          {/* Register → only when NOT logged in */}
          {!isLoggedIn && (
            <li className="nav-item">
              <NavLink
                className="nav-link d-flex gap-2 align-items-center text-dark"
                to="/register"
              >
                <i className="bi bi-gear text-secondary fs-5"></i>
                Register
              </NavLink>
            </li>
          )}

          {/* Login / Logout */}
          {!isLoggedIn ? (
            <li className="nav-item">
              <NavLink className="btn btn-outline-primary" to="/login">
                Login
              </NavLink>
            </li>
          ) : (
            <li className="nav-item">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
