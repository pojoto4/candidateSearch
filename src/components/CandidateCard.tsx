import type Candidate from "../utils/Candidate.interface";
import { FaPlus, FaMinus } from "react-icons/fa";

type CandidateCardProps = {
  currentCandidate: Candidate;
  addToSavedList?: () => void; // Removed null
  skipCandidate?: () => void; // Removed null
  // Removed unused props
};

const CandidateCard = ({
  currentCandidate,
  addToSavedList,
  skipCandidate,
}: CandidateCardProps) => {
  return (
    <>
      {currentCandidate?.login ? (
        <section className="card">
          <div className="card-header">
            <img
              src={currentCandidate.avatar_url || ""} // Use empty string fallback
              alt={`${
                currentCandidate.name || currentCandidate.login
              }'s avatar`}
            />
            <h2>{currentCandidate.name || currentCandidate.login}</h2>
          </div>

          <div className="card-body">
            <p>
              <strong>Username:</strong> {currentCandidate.login}
            </p>
            {currentCandidate.location && (
              <p>
                <strong>Location:</strong> {currentCandidate.location}
              </p>
            )}
            {currentCandidate.email && (
              <p>
                <strong>Email:</strong> {currentCandidate.email}
              </p>
            )}
            {currentCandidate.company && (
              <p>
                <strong>Company:</strong> {currentCandidate.company}
              </p>
            )}
            {currentCandidate.bio && (
              <p>
                <strong>Bio:</strong> {currentCandidate.bio}
              </p>
            )}
            <p>
              <strong>GitHub:</strong>{" "}
              <a
                href={currentCandidate.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {currentCandidate.html_url}
              </a>
            </p>
          </div>

          <div className="card-footer">
            <button onClick={() => skipCandidate && skipCandidate()}>
              <FaMinus />
            </button>
            <button onClick={() => addToSavedList && addToSavedList()}>
              <FaPlus />
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default CandidateCard;
