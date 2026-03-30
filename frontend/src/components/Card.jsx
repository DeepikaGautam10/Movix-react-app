import useBookmark from "../hooks/useBookmark";

function Card({ item }) {
  const { isBookmarked, toggleBookmark } = useBookmark();
  const bookmarked = isBookmarked(item.id);

  const handleBookmark = (e) => {
    e.stopPropagation();
    toggleBookmark(item);
  };

  return (
    <div className="card">
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

      {/* bookmark button — fills red when saved */}
      <button
        className="bookmark-btn"
        onClick={handleBookmark}
        title={bookmarked ? "Remove bookmark" : "Save bookmark"}
        style={{
          background: bookmarked ? "#e50914" : "rgba(0,0,0,0.72)",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={bookmarked ? "white" : "none"}
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
      </button>

      <div className="card-info">
        <div className="card-title">{item.title}</div>
        <div className="card-meta">
          <span>{item.year}</span>
          <span>·</span>
          <span>{item.type === "movie" ? "Movie" : "TV"}</span>
          {item.rating > 0 && (
            <>
              <span>·</span>
              <span className="card-rating">★ {item.rating}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;