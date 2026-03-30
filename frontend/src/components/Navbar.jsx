import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const userName = "Deepika";

  return (
    <nav className="navbar">
      <div className="navbar-logo">MOVIX</div>

      <div className="navbar-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/tv">TV Series</NavLink>
        <NavLink to="/bookmarks">Bookmarks</NavLink>
      </div>

      <div className="navbar-user">
        <div className="user-avatar">
          {userName.charAt(0).toUpperCase()}
        </div>
        <span className="user-name">{userName}</span>
      </div>
    </nav>
  );
}

export default Navbar;