import { createContext, useContext, useState, useEffect } from "react";

const BookmarkContext = createContext(null);

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookmarks")
      .then((r) => r.json())
      .then((data) => {
        setBookmarks(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Failed to load bookmarks:", err))
      .finally(() => setLoading(false));
  }, []);

  const isBookmarked = (id) => {
    return bookmarks.some((b) => b.tmdbId === Number(id));
  };

  const toggleBookmark = async (item) => {
    const alreadySaved = isBookmarked(item.id);

    if (alreadySaved) {
      setBookmarks((prev) => prev.filter((b) => b.tmdbId !== Number(item.id)));
      try {
        await fetch(`/api/bookmarks/${item.id}`, { method: "DELETE" });
      } catch (err) {
        console.error("Failed to remove bookmark:", err);
      }
    } else {
      const tempEntry = { tmdbId: Number(item.id), ...item };
      setBookmarks((prev) => [...prev, tempEntry]);
      try {
        const res = await fetch("/api/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tmdbId: item.id,
            title: item.title,
            image: item.image,
            type: item.type,
            year: item.year,
            rating: item.rating,
          }),
        });
        const saved = await res.json();
        setBookmarks((prev) =>
          prev.map((b) => (b.tmdbId === Number(item.id) ? saved : b))
        );
      } catch (err) {
        setBookmarks((prev) =>
          prev.filter((b) => b.tmdbId !== Number(item.id))
        );
        console.error("Failed to add bookmark:", err);
      }
    }
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, loading, isBookmarked, toggleBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

function useBookmark() {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error("useBookmark must be used inside BookmarkProvider");
  return ctx;
}

export default useBookmark;