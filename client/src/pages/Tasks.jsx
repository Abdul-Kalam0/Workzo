import { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

export const Tasks = () => {
  const [taskFilterValue, setTaskFilterValue] = useState(null);
  const { tasks, loading: taskLoading, error: taskError } = useTasks();

  const filteredTasks = taskFilterValue
    ? tasks.filter((tk) => tk.status === taskFilterValue)
    : tasks;
  return (
    <>
      <Navbar />
      <main>
        <div>
          <div className="d-flex justify-content-between align-item-center">
            {/* left */}
            <div className="d-flex">
              <h2>Filter</h2>
              <select className="btn btn-light">
                <option>Filter</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            {/* right */}
            <div>
              <Link to="/tasks" className="btn btn-primary">
                +New Task
              </Link>
            </div>
          </div>

          {/* Tasks card */}
          <div>
            {tasks.length > 0 ? (
              <div className="row">
                {filteredTasks.map((tk) => (
                  <div className="col-4 col-md-4" key={tk._id}>
                    <div className="card">
                      <div className="card-body">
                        <p>{tk.status}</p>
                        <h4>{tk.name}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Taska not found.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
