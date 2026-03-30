import { useState, useEffect } from "react";
import Card from "../components/Card";
import useBookmark from "../hooks/useBookmark";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const { isBookmarked, toggleBookmark } = useBookmark();

  const fetchMovies = async (pageNum, append = false) => {
    try {
      if (append) setLoadingMore(true);
      else setLoading(true);

      const res = await fetch(`/api/movies?page=${pageNum}`);
      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();

      if (append) {
        setMovies((prev) => [...prev, ...data.movies]);
      } else {
        setMovies(data.movies);
      }
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Failed to load movies");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchMovies(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage, true);
  };

  const filtered = movies.filter((m) =>
    m.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="status-msg">Loading Movies...</p>;
  if (error) return <p className="error-msg">{error}</p>;

  return (
    <div>
      <input
        className="search-bar"
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h1 className="page-title">Movies</h1>

      {filtered.length === 0 ? (
        <p className="status-msg">No shows found for "{search}"</p>
      ) : (
      <div className="card-grid">
        {filtered.map((movie) => (
          <Card
            key={movie.id}
            item={movie}
            isBookmarked={isBookmarked(movie.id)}
            onBookmark={toggleBookmark}
          />
        ))}
      </div>
      )}

      {!search && page < totalPages && (
        <button
          className="load-more-btn"
          onClick={handleLoadMore}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}

export default Movies;
