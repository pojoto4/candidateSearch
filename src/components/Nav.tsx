import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div
      style={{
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <nav className="nav" style={{ width: "100%" }}>
        <div className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/SavedCandidates" className="nav-link">
            Potential Candidates
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
