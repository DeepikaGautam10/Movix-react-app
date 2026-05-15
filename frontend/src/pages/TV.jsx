import { useState, useEffect } from "react";
import Card from "../components/Card";
import { SkeletonGrid } from "../components/Skeleton";

function TV() {
  const [shows, setShows] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const fetchShows = async (pageNum, append = false) => {
    try {
      if (append) setLoadingMore(true);
      else setLoading(true);

      const res = await fetch(`/api/tv?page=${pageNum}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      if (append) {
        setShows((prev) => [...prev, ...data.shows]);
      } else {
        setShows(data.shows);
      }
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Failed to load TV shows. Is the backend running?");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchShows(1);
  }, []);

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchShows(next, true);
  };

  const filtered = shows.filter((s) =>
    s.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (error) return <p className="error-msg">{error}</p>;

  return (
    <div>
      <input
        className="search-bar"
        type="text"
        placeholder="Search TV series..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="section-header">
        <div>
          <h1 className="page-title">TV Series</h1>
          <p className="page-subtitle">Trending shows worth bingeing</p>
        </div>
        {!loading && filtered.length > 0 && (
          <span className="section-count">{filtered.length} titles</span>
        )}
      </div>

      {loading ? (
        <SkeletonGrid />
      ) : filtered.length === 0 ? (
        <p className="status-msg">No shows found for "{search}"</p>
      ) : (
        <div className="card-grid">
          {filtered.map((show) => (
            <Card key={show.id} item={show} />
          ))}
        </div>
      )}

      {!loading && !search && page < totalPages && (
        <button
          className="load-more-btn"
          onClick={handleLoadMore}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading…" : "Load More"}
        </button>
      )}
    </div>
  );
}

export default TV;
