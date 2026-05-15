import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useBookmark from "../hooks/useBookmark";
import { BookmarkIcon, PlayIcon } from "./Icons.jsx";

function Card({ item }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmark();
  const bookmarked = isBookmarked(item.id);

  const handleBookmark = (e) => {
    e.stopPropagation();
    // bookmarking needs an account — send guests to login first
    if (!user) {
      navigate("/login");
      return;
    }
    toggleBookmark(item);
  };

  return (
    <article className="card">
      <div className="card-poster-wrap">
        {item.image ? (
          <img
            className="card-poster"
            src={item.image}
            alt={item.title}
            loading="lazy"
          />
        ) : (
          <div className="card-no-image">No Image</div>
        )}

        <div className="card-overlay" />

        {item.rating > 0 && (
          <span className="card-badge">★ {item.rating}</span>
        )}

        <span className="card-type-tag">
          {item.type === "movie" ? "Movie" : "Series"}
        </span>

        <button
          className={`bookmark-btn${bookmarked ? " is-saved" : ""}`}
          onClick={handleBookmark}
          aria-label={bookmarked ? "Remove bookmark" : "Save bookmark"}
          title={bookmarked ? "Remove bookmark" : "Save bookmark"}
        >
          <BookmarkIcon filled={bookmarked} />
        </button>

        <div className="card-hover-cta">
          <PlayIcon />
          View Details
        </div>
      </div>

      <div className="card-info">
        <h3 className="card-title">{item.title}</h3>
        <div className="card-meta">
          <span>{item.year}</span>
          {item.rating > 0 && (
            <>
              <span>·</span>
              <span className="card-rating">★ {item.rating}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default Card;
