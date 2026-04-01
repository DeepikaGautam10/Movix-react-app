import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import "../styles/Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
        {user ? (
          <>
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">{user.name.split(' ')[0]}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <NavLink to="/login" className="login-link">Login</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;