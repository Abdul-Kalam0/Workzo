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
import { ProjectProvider } from "./context/ProjectContext.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import { Register } from "./pages/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TeamForm } from "./pages/TeamForm.jsx";
import { TeamProvider } from "./context/TeamContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { Tasks } from "./pages/Tasks.jsx";
import { ProjectDetails } from "./pages/ProjectDetails.jsx";
import { TaskDetails } from "./pages/TaskDetails.jsx";
import { TaskEdit } from "./pages/TaskEdit.jsx";
import { ProjectEdit } from "./pages/ProjectEdit.jsx";

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
  { path: "/register", element: <Register /> },
  { path: "/team-form", element: <TeamForm /> },
  { path: "/tasks", element: <Tasks /> },
  { path: "/projects/:pId", element: <ProjectDetails /> },
  { path: "/tasks/:tId", element: <TaskDetails /> },
  { path: "/tasks/:tId/edit", element: <TaskEdit /> },
  { path: "/projects/:pId/edit", element: <ProjectEdit /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <ProjectProvider>
          <TaskProvider>
            <TeamProvider>
              <RouterProvider router={router} />
            </TeamProvider>
          </TaskProvider>
        </ProjectProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
