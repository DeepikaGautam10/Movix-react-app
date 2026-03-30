import { useState, useEffect } from "react";
import Card from "../components/Card";
import useBookmark from "../hooks/useBookmark";

function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isBookmarked, toggleBookmark } = useBookmark();

  useEffect(() => {
    // fetch both movies and tv, mix them together for home page
    const loadData = async () => {
      try {
        setLoading(true);
        const [moviesRes, tvRes] = await Promise.all([
          fetch("/api/movies"),
          fetch("/api/tv"),
        ]);
        const moviesData = await moviesRes.json();
        const tvData = await tvRes.json();

        // mix and shuffle a bit
        const combined = [
          ...moviesData.movies.slice(0, 10),
          ...tvData.shows.slice(0, 10),
        ].sort(() => Math.random() - 0.5);

        setItems(combined);
      } catch (err) {
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filtered = items.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="status-msg">Loading movies and tv shows...</p>;
  if (error) return <p className="error-msg">{error}</p>;

  return (
    <div>
      <input
        className="search-bar"
        type="text"
        placeholder="Search movies and TV shows..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h1 className="page-title">Trending</h1>

      <div className="card-grid">
        {filtered.map((item) => (
          <Card
            key={`${item.type}-${item.id}`}
            item={item}
            isBookmarked={isBookmarked(item.id)}
            onBookmark={toggleBookmark}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="status-msg">No results for "{search}"</p>
      )}
    </div>
  );
}

export default Home;
