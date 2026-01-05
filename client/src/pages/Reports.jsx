import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export const Reports = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [lastWeekTasks, setLastWeekTasks] = useState([]);
  const [pendingDays, setPendingDays] = useState(0);
  const [closedByProject, setClosedByProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH REPORTS ================= */
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);

        const [lastWeekRes, pendingRes, closedRes] = await Promise.all([
          axios.get(`${BASE_URL}/report/last-week`, {
            withCredentials: true,
          }),
          axios.get(`${BASE_URL}/report/pending`, {
            withCredentials: true,
          }),
          axios.get(`${BASE_URL}/report/closed-tasks?groupBy=project`, {
            withCredentials: true,
          }),
        ]);

        setLastWeekTasks(lastWeekRes.data.tasks || []);
        setPendingDays(pendingRes.data.totalPendingDays || 0);
        setClosedByProject(closedRes.data.data || []);
      } catch (err) {
        setError("Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [BASE_URL]);

  /* ================= CHART DATA ================= */

  // 1️⃣ Closed Tasks by Project
  const closedTasksByProjectChart = {
    labels: closedByProject.map((p) => p.name),
    datasets: [
      {
        label: "Closed Tasks",
        data: closedByProject.map((p) => p.closedTasks),
        backgroundColor: "#6f42c1",
      },
    ],
  };

  // 2️⃣ Tasks Closed in Last 7 Days
  const lastWeekChart = {
    labels: ["Last 7 Days"],
    datasets: [
      {
        label: "Tasks Closed",
        data: [lastWeekTasks.length],
        backgroundColor: "#198754",
      },
    ],
  };

  // 3️⃣ Pending Work (Days)
  const pendingWorkChart = {
    labels: ["Pending Days"],
    datasets: [
      {
        data: [pendingDays],
        backgroundColor: ["#ffc107"],
      },
    ],
  };

  return (
    <>
      <Navbar />

      <main className="container my-5" style={{ minHeight: "70vh" }}>
        <h2 className="fw-bold mb-4">Reports & Analytics</h2>

        {/* Loading */}
        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" />
            <p className="mt-2">Loading reports...</p>
          </div>
        )}

        {/* Error */}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <>
            {/* ================= SUMMARY CARDS ================= */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-4">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h6 className="text-muted">Tasks Closed (Last 7 Days)</h6>
                    <h3 className="fw-bold text-success">
                      {lastWeekTasks.length}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h6 className="text-muted">Pending Work (Days)</h6>
                    <h3 className="fw-bold text-warning">{pendingDays}</h3>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h6 className="text-muted">Projects with Closed Tasks</h6>
                    <h3 className="fw-bold text-primary">
                      {closedByProject.length}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= CHARTS ================= */}
            <div className="row g-4">
              {/* GRAPH 1 */}
              <div className="col-12 col-lg-6">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body">
                    <h5 className="fw-semibold mb-3">
                      Closed Tasks by Project
                    </h5>
                    <Bar data={closedTasksByProjectChart} />
                  </div>
                </div>
              </div>

              {/* GRAPH 2 */}
              <div className="col-12 col-lg-3">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body">
                    <h5 className="fw-semibold mb-3">
                      Tasks Closed (Last 7 Days)
                    </h5>
                    <Bar data={lastWeekChart} />
                  </div>
                </div>
              </div>

              {/* GRAPH 3 */}
              <div className="col-12 col-lg-3">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body">
                    <h5 className="fw-semibold mb-3">Pending Work (Days)</h5>
                    <Doughnut data={pendingWorkChart} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  );
};
