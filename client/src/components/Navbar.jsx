import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { isLoggedIn, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      alert("Logout failed");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `nav-link d-flex align-items-center gap-2 ${
      isActive ? "fw-semibold text-primary" : "text-dark"
    }`;

  return (
    <nav
      className="navbar navbar-expand-lg px-3 px-md-4 py-3"
      style={{ backgroundColor: "#f3f1f8" }}
    >
      {/* Brand */}
      <Link className="navbar-brand fw-bold text-dark fs-4" to="/">
        Workzo
      </Link>

      {/* Toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Nav */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3 mt-3 mt-lg-0">
          <li className="nav-item">
            <NavLink to="/" className={navLinkClass}>
              <i className="bi bi-speedometer2 fs-5 text-primary"></i>
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/projects" className={navLinkClass}>
              <i className="bi bi-kanban fs-5 text-purple"></i>
              Projects
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/tasks" className={navLinkClass}>
              <i className="bi bi-list-check fs-5 text-secondary"></i>
              Tasks
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/teams" className={navLinkClass}>
              <i className="bi bi-people fs-5 text-success"></i>
              Teams
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/reports" className={navLinkClass}>
              <i className="bi bi-bar-chart-line fs-5 text-warning"></i>
              Reports
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/setting" className={navLinkClass}>
              <i className="bi bi-gear fs-5 text-muted"></i>
              Settings
            </NavLink>
          </li>

          {/* 🔐 SINGLE AUTH BUTTON */}
          <li className="nav-item">
            {!isLoggedIn ? (
              <button
                className="btn btn-outline-primary px-3 d-flex align-items-center gap-2"
                onClick={() => navigate("/login")}
              >
                <i className="bi bi-box-arrow-in-right"></i>
                Login / Register
              </button>
            ) : (
              <button
                className="btn btn-danger px-3 d-flex align-items-center gap-2"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right"></i>
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
