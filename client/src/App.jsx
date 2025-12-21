import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer";
import { Link } from "react-router-dom";

function App() {
  const [filterProject, setFilterProject] = useState(null);
  const [filterTasks, setFilterTasks] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get(`${BASE_URL}/projects`);
      setProjects(response.data.projects);
    };

    const fetchTasks = async () => {
      const response = await axios.get(`${BASE_URL}/tasks`);
      setTasks(response.data.tasks);
      console.log(response);
    };

    fetchProjects();
    fetchTasks();
  }, [BASE_URL]);
  console.log(projects);

  const handleSelectProjects = (e) => {
    setFilterProject(e.target.value);
  };
  const handleSelectTasks = (e) => {
    setFilterTasks(e.target.value);
  };
  console.log();

  const filteredProjects = filterProject
    ? projects.filter((p) => p.status === filterProject).slice(0, 4)
    : projects.slice(0, 4);
  const filteredTasks = filterTasks
    ? tasks.filter((t) => t.status === filterTasks)
    : tasks;

  return (
    <>
      <Navbar />
      <main className="mt-4 container" style={{ minHeight: "74vh" }}>
        {/* Search Bar */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <input type="text" placeholder="Serach" className="form-control" />
          </div>
        </div>

        {/* Projects Area */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          {/* left section */}
          <div className="d-flex gap-3 align-items-center">
            <strong>
              <h4 className="fs-2">Projects</h4>
            </strong>

            <div>
              <select onChange={handleSelectProjects} className="bg-light">
                <option value="">Filter</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* right section */}
          <div className="">
            <Link to="/project-form" className="btn btn-primary">
              +New Project
            </Link>
          </div>
        </div>

        {/* project card */}
        {projects.length > 0 ? (
          <div className="row">
            {filteredProjects.map((pj) => (
              <div className="col-3 col-md-3 mb-4" key={pj._id}>
                <div className="card">
                  <div className="card-body" style={{ height: "200px" }}>
                    <p>{pj.status}</p>
                    <h4>{pj.name}</h4>
                    <p>{pj.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Project does not exist.</p>
        )}

        {/* My Task Area */}
        <div className="d-flex justify-content-between align-items-center">
          {/* left section */}
          <div className="d-flex gap-3 align-items-center">
            <div>
              <h2>My Task</h2>
            </div>

            <div className="">
              <select onChange={handleSelectTasks} className="bg-light">
                <option value="">Filter</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          {/* right section */}
          <div className="d-flex">
            <Link to="/task-form" className="btn btn-primary">
              +New Task
            </Link>
          </div>
        </div>

        {/* task card */}
        {tasks.length > 0 ? (
          <div className="row">
            {filteredTasks.map((tk) => (
              <div className="col-3 col-md-3 mb-4" key={tk._id}>
                <div className="card">
                  <div className="card-body">
                    <p>{tk.status}</p>
                    <h4>{tk.name}</h4>
                    <p>{tk.createdAt}</p>
                    <p>{tk.team}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Tasks does not exist.</p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
