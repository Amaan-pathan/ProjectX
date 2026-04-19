import { useEffect, useState } from "react";
import { fetchCandidates } from "../api/candidateApi";
import CandidateList from "../components/CandidateList";
import ReferralForm from "../components/ReferralForm";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCandidates = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchCandidates();
      setCandidates(data);
    } catch (err) {
      setError(err.error || "Failed to load candidates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCandidateAdded = () => {
    loadCandidates();
  };

  const handleCandidateUpdate = () => {
    loadCandidates();
  };

  const handleCandidateDelete = () => {
    loadCandidates();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Candidate Referral Management System</h1>
        <p className="subtitle">Manage your candidate referrals efficiently</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="dashboard-layout">
        <div className="form-section">
          <ReferralForm onSuccess={handleCandidateAdded} />
        </div>

        <div className="list-section">
          <SearchBar onSearch={handleSearch} />

          {loading ? (
            <div className="loading">
              <p>Loading candidates...</p>
            </div>
          ) : (
            <CandidateList
              candidates={candidates}
              searchQuery={searchQuery}
              onUpdate={handleCandidateUpdate}
              onDelete={handleCandidateDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



