import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useBookmark from "../hooks/useBookmark";
import { PlusIcon, CheckIcon } from "./Icons.jsx";

/* Featured banner — spotlights one trending title on the Home page. */
function Hero({ item }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmark();
  const saved = isBookmarked(item.id);

  // bookmarking needs an account — send guests to login first
  const handleBookmark = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    toggleBookmark(item);
  };

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${item.backdrop || item.image})` }}
    >
      <div className="hero-shade" />

      <div className="hero-content">
        <span className="hero-tag">
          Featured {item.type === "movie" ? "Movie" : "Series"}
        </span>

        <h1 className="hero-title">{item.title}</h1>

        <div className="hero-meta">
          {item.rating > 0 && (
            <span className="hero-rating">★ {item.rating}</span>
          )}
          {item.year && item.year !== "N/A" && (
            <>
              {item.rating > 0 && <span className="hero-dot" />}
              <span>{item.year}</span>
            </>
          )}
        </div>

        {item.overview && <p className="hero-overview">{item.overview}</p>}

        <button
          className={`hero-btn${saved ? " is-saved" : ""}`}
          onClick={handleBookmark}
        >
          {saved ? <CheckIcon /> : <PlusIcon />}
          {saved ? "Saved to Bookmarks" : "Add to Bookmarks"}
        </button>
      </div>
    </section>
  );
}

export default Hero;
