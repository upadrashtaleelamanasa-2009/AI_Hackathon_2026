import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">

      <div className="container">

        <Link className="navbar-brand" to="/">
          AI Dashboard
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/history">
            History
          </Link>

          <Link className="nav-link" to="/about">
            About
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;