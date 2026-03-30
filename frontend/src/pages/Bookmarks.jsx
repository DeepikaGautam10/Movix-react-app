import useBookmark from "../hooks/useBookmark";
import Card from "../components/Card";
import { useState } from "react";

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

      <h1 className="page-title">Bookmarks</h1>

      {bookmarks.length === 0 ? (
        <div className="empty-state">
          <h2>No Bookmarks Yet</h2>
          <p>Click the bookmark icon on any movie or show to save it here.</p>
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