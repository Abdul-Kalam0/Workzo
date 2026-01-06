import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PublicRoute = () => {
  const { isLoggedIn, loading } = useAuth();

  // ⏳ Wait for auth check
  if (loading) return null;

  // 🔁 If logged in, block login/register
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // 🚪 Not logged in → allow access
  return <Outlet />;
};
