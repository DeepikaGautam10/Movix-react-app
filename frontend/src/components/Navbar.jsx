import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import {
  HomeIcon,
  MovieIcon,
  TvIcon,
  BookmarkIcon,
  PlayIcon,
} from "./Icons.jsx";
import "../styles/Navbar.css";

const LINKS = [
  { to: "/", label: "Home", icon: <HomeIcon />, end: true },
  { to: "/movies", label: "Movies", icon: <MovieIcon /> },
  { to: "/tv", label: "TV Series", icon: <TvIcon /> },
  { to: "/bookmarks", label: "Bookmarks", icon: <BookmarkIcon /> },
];

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-mark">
          <PlayIcon />
        </span>
        <span className="logo-text">
          MOVI<span className="logo-x">X</span>
        </span>
      </div>

      <div className="navbar-links">
        {LINKS.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.end} title={link.label}>
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="navbar-user">
        {user ? (
          <>
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">{user.name.split(" ")[0]}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Sign out
              </button>
            </div>
          </>
        ) : (
          <NavLink to="/login" className="login-link">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
