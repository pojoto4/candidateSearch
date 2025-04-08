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

  // Function to fetch a candidate
  const fetchCandidate = async () => {
    try {
      // Get a list of users
      const users = await searchGithub();

      if (users && users.length > 0) {
        // Get a random user from the list
        const randomIndex = Math.floor(Math.random() * users.length);
        const username = users[randomIndex].login;

        // Get detailed user information
        const userData = await searchGithubUser(username);
        setCurrentCandidate(userData);
      }
    } catch (err) {
      console.error("Error fetching candidate:", err);
    }
  };

  // Load initial candidate on component mount
  useEffect(() => {
    fetchCandidate();
  }, []);

  // Function to save candidate to localStorage
  const addToSavedList = () => {
    if (currentCandidate.login) {
      let savedCandidates: Candidate[] = [];
      const storedCandidates = localStorage.getItem("savedCandidates");
      if (typeof storedCandidates === "string") {
        savedCandidates = JSON.parse(storedCandidates);
      }
      savedCandidates.push(currentCandidate);
      localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
      fetchCandidate(); // Load next candidate
    }
  };

  // Function to skip current candidate
  const skipCandidate = () => {
    fetchCandidate(); // Load next candidate
  };

  return (
    <main>
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
