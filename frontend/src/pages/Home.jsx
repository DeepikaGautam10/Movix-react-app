import { useState, useEffect } from "react";
import Card from "../components/Card";
import Hero from "../components/Hero";
import { SkeletonGrid, SkeletonHero } from "../components/Skeleton";

function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // spotlight the first title that has a wide backdrop image
  const featured = items.find((i) => i.backdrop) || items[0];

  if (loading) {
    return (
      <div>
        <SkeletonHero />
        <div className="section-header">
          <h1 className="page-title">Trending Now</h1>
        </div>
        <SkeletonGrid />
      </div>
    );
  }

  if (error) return <p className="error-msg">{error}</p>;

  return (
    <div>
      {!search && featured && <Hero item={featured} />}

      <input
        className="search-bar"
        type="text"
        placeholder="Search movies and TV shows..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="section-header">
        <div>
          <h1 className="page-title">
            {search ? "Search Results" : "Trending Now"}
          </h1>
          <p className="page-subtitle">
            {search
              ? `Showing matches for "${search}"`
              : "A fresh mix of popular movies and series"}
          </p>
        </div>
        {filtered.length > 0 && (
          <span className="section-count">{filtered.length} titles</span>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="status-msg">No results for "{search}"</p>
      ) : (
        <div className="card-grid">
          {filtered.map((item) => (
            <Card key={`${item.type}-${item.id}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
