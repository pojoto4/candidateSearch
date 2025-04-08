import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import CandidateCard from "../components/CandidateCard";
import type Candidate from "../utils/Candidate.interface";

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    login: "",
    avatar_url: "",
    location: null,
    email: null,
    company: null,
    bio: null,
    html_url: "",
    name: null,
  });

  const fetchCandidate = async () => {
    try {
      const users = await searchGithub();

      if (users && users.length > 0) {
        const randomIndex = Math.floor(Math.random() * users.length);
        const username = users[randomIndex].login;

        const userData = await searchGithubUser(username);
        setCurrentCandidate(userData);
      }
    } catch (err) {
      console.error("Error fetching candidate:", err);
    }
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  const addToSavedList = () => {
    if (currentCandidate.login) {
      let savedCandidates: Candidate[] = [];
      const storedCandidates = localStorage.getItem("savedCandidates");
      if (typeof storedCandidates === "string") {
        savedCandidates = JSON.parse(storedCandidates);
      }
      savedCandidates.push(currentCandidate);
      localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
      fetchCandidate();
    }
  };

  const skipCandidate = () => {
    fetchCandidate();
  };

  return (
    <main style={{ paddingTop: "20px" }}>
      <h1>Candidate Search</h1>
      <CandidateCard
        currentCandidate={currentCandidate}
        addToSavedList={addToSavedList}
        skipCandidate={skipCandidate}
      />
    </main>
  );
};

export default CandidateSearch;
