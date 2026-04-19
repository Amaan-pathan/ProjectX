import { useState } from "react";
import { updateStatus, deleteCandidate } from "../api/candidateApi";

const CandidateCard = ({ candidate, onUpdate, onDelete }) => {
  const [status, setStatus] = useState(candidate.status);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await updateStatus(candidate._id, newStatus);
      setMessage("Status updated successfully!");
      if (onUpdate) onUpdate();
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setStatus(candidate.status);
      setError(err.error || "Failed to update status");
      setTimeout(() => setError(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      try {
        await deleteCandidate(candidate._id);
        setMessage("Candidate deleted successfully!");
        if (onDelete) onDelete();
      } catch (err) {
        setError(err.error || "Failed to delete candidate");
        setTimeout(() => setError(""), 2000);
      }
    }
  };

  const openResume = () => {
    if (candidate.resumeUrl) {
      window.open(`https://candidate-referral-system-backend.onrender.com/${candidate.resumeUrl}`, "_blank");
    }
  };

  return (
    <div className="candidate-card">
      <div className="card-header">
        <h3>{candidate.name}</h3>
        <span className={`status-badge status-${candidate.status}`}>
          {status}
        </span>
      </div>

      <div className="card-body">
        <div className="info-row">
          <span className="label">Email:</span>
          <span className="value">{candidate.email}</span>
        </div>

        <div className="info-row">
          <span className="label">Phone:</span>
          <span className="value">{candidate.phone}</span>
        </div>

        <div className="info-row">
          <span className="label">Job Title:</span>
          <span className="value">{candidate.jobTitle}</span>
        </div>

        {candidate.resumeUrl && (
          <div className="info-row">
            <span className="label">Resume:</span>
            <button
              className="resume-link"
              onClick={openResume}
              title="Open resume in new tab"
            >
              📄 View PDF
            </button>
          </div>
        )}
      </div>

      <div className="card-actions">
        <div className="status-selector">
          <label htmlFor={`status-${candidate._id}`}>Change Status:</label>
          <select
            id={`status-${candidate._id}`}
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={loading}
            className="status-select"
          >
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Hired">Hired</option>
          </select>
        </div>

        <button
          className="delete-btn"
          onClick={handleDelete}
          title="Delete candidate"
        >
          Delete
        </button>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}
    </div>
  );
};

export default CandidateCard;
