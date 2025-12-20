import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Projects } from "./pages/Projects.jsx";
import { Teams } from "./pages/Teams.jsx";
import { Reports } from "./pages/Reports.jsx";
import { Setting } from "./pages/Setting.jsx";
import { ProjectForm } from "./pages/ProjectForm.jsx";
import { Login } from "./pages/Login.jsx";
import { TaskForm } from "./pages/TaskForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/projects", element: <Projects /> },
  { path: "/teams", element: <Teams /> },
  { path: "/reports", element: <Reports /> },
  { path: "/setting", element: <Setting /> },
  { path: "/project-form", element: <ProjectForm /> },
  { path: "/login", element: <Login /> },
  { path: "/task-form", element: <TaskForm /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
