import CandidateCard from "./CandidateCard";

const CandidateList = ({ candidates, searchQuery, onUpdate, onDelete }) => {
  // Filter candidates by job title or status
  const filteredCandidates = candidates.filter((candidate) => {
    const query = searchQuery.toLowerCase();
    return (
      candidate.jobTitle.toLowerCase().includes(query) ||
      candidate.status.toLowerCase().includes(query) ||
      candidate.name.toLowerCase().includes(query)
    );
  });

  if (filteredCandidates.length === 0) {
    return (
      <div className="candidate-list empty">
        <p>
          {candidates.length === 0
            ? "No candidates yet. Add your first candidate!"
            : "No candidates match your search."}
        </p>
      </div>
    );
  }

  return (
    <div className="candidate-list">
      <h2>Candidates ({filteredCandidates.length})</h2>
      <div className="cards-grid">
        {filteredCandidates.map((candidate) => (
          <CandidateCard
            key={candidate._id}
            candidate={candidate}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default CandidateList;
