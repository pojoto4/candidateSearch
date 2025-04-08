import { useState, useEffect } from "react";
import type Candidate from "../utils/Candidate.interface";
import { FaMinus } from "react-icons/fa";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const loadSavedCandidates = () => {
      const storedCandidates = localStorage.getItem("savedCandidates");
      if (storedCandidates) {
        setSavedCandidates(JSON.parse(storedCandidates));
      } else {
        setSavedCandidates([]);
      }
    };

    loadSavedCandidates();
    window.addEventListener("storage", loadSavedCandidates);

    return () => {
      window.removeEventListener("storage", loadSavedCandidates);
    };
  }, []);

  const removeCandidate = (candidateLogin: string) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.login !== candidateLogin
    );
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
    setSavedCandidates(updatedCandidates);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <main>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates saved yet. Go to the home page to find candidates.</p>
      ) : (
        <table className="table" style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.login}>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <img
                    src={candidate.avatar_url || ""}
                    alt={`${candidate.name || candidate.login}'s avatar`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "20px",
                      padding: "10px",
                    }}
                  />
                </td>

                <td>{candidate.name || candidate.login}</td>
                <td>{candidate.location || "N/A"}</td>
                <td>{candidate.email || "N/A"}</td>
                <td>{candidate.company || "N/A"}</td>
                <td>
                  {candidate.bio
                    ? candidate.bio.substring(0, 100) +
                      (candidate.bio.length > 100 ? "..." : "")
                    : "N/A"}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <button
                    onClick={() => removeCandidate(candidate.login || "")}
                    style={{
                      backgroundColor: "rgba(255,0,0,0.7)",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0",
                      margin: "auto",
                      cursor: "pointer",
                    }}
                  >
                    <FaMinus />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default SavedCandidates;
