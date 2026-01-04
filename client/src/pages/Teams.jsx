import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { useTeams } from "../context/TeamContext";

export const Teams = () => {
  const { teams, loading, error } = useTeams();

  return (
    <>
      <Navbar />

      <main className="container my-4" style={{ minHeight: "70vh" }}>
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
          <h3 className="fw-bold mb-0">Teams</h3>

          <Link to="/team-form" className="btn btn-primary btn-sm">
            + New Team
          </Link>
        </div>

        {/* Loading */}
        {loading && <p>Loading...</p>}

        {/* Error */}
        {error && <p className="text-danger">{error}</p>}

        {/* Table */}
        {!loading && teams?.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "80px" }}>S.No</th>
                  <th>NAME</th>
                  <th className="d-none d-md-table-cell">DESCRIPTION</th>
                </tr>
              </thead>

              <tbody>
                {teams.map((team, index) => (
                  <tr key={team._id}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{team.name}</td>
                    <td className="text-muted d-none d-md-table-cell">
                      {team.description || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && <p className="text-muted">No teams found.</p>
        )}
      </main>

      <Footer />
    </>
  );
};
