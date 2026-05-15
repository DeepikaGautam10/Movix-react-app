import { useState } from "react";
import useBookmark from "../hooks/useBookmark";
import Card from "../components/Card";
import { BookmarkIcon } from "../components/Icons.jsx";

function Bookmarks() {
  const { bookmarks } = useBookmark();
  const [search, setSearch] = useState("");

  // convert bookmark shape to match what Card expects
  const toCardItem = (b) => ({
    id: b.tmdbId,
    title: b.title,
    image: b.image,
    type: b.type,
    year: b.year,
    rating: b.rating,
  });

  const filtered = bookmarks.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        className="search-bar"
        type="text"
        placeholder="Search bookmarks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="section-header">
        <div>
          <h1 className="page-title">Your Bookmarks</h1>
          <p className="page-subtitle">Titles you've saved to watch later</p>
        </div>
        {bookmarks.length > 0 && (
          <span className="section-count">{bookmarks.length} saved</span>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <BookmarkIcon />
          </div>
          <h2>No Bookmarks Yet</h2>
          <p>Tap the bookmark icon on any movie or show to save it here.</p>
        </div>
      ) : filtered.length === 0 ? (
        <p className="status-msg">No bookmarks match "{search}"</p>
      ) : (
        <div className="card-grid">
          {filtered.map((b) => (
            <Card key={b.tmdbId} item={toCardItem(b)} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookmarks;
