import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <div className="nav-item">
          <Link to="/saved" className="nav-link">
            Potential Candidates
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
