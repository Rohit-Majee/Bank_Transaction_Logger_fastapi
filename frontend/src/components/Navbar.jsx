import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        Dashboard
      </Link>
      <Link to="/search" className="nav-link">
        Search Transactions
      </Link>
    </nav>
  );
}
