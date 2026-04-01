// import { createContext, useContext, useState, useEffect } from "react";

// const BookmarkContext = createContext(null);

// export function BookmarkProvider({ children }) {
//   const [bookmarks, setBookmarks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/bookmarks")
//       .then((r) => r.json())
//       .then((data) => {
//         setBookmarks(Array.isArray(data) ? data : []);
//       })
//       .catch((err) => console.error("Failed to load bookmarks:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   const isBookmarked = (id) => {
//     return bookmarks.some((b) => b.tmdbId === Number(id));
//   };

//   const toggleBookmark = async (item) => {
//     const alreadySaved = isBookmarked(item.id);

//     if (alreadySaved) {
//       setBookmarks((prev) => prev.filter((b) => b.tmdbId !== Number(item.id)));
//       try {
//         await fetch(`/api/bookmarks/${item.id}`, { method: "DELETE" });
//       } catch (err) {
//         console.error("Failed to remove bookmark:", err);
//       }
//     } else {
//       const tempEntry = { tmdbId: Number(item.id), ...item };
//       setBookmarks((prev) => [...prev, tempEntry]);
//       try {
//         const res = await fetch("/api/bookmarks", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             tmdbId: item.id,
//             title: item.title,
//             image: item.image,
//             type: item.type,
//             year: item.year,
//             rating: item.rating,
//           }),
//         });
//         const saved = await res.json();
//         setBookmarks((prev) =>
//           prev.map((b) => (b.tmdbId === Number(item.id) ? saved : b))
//         );
//       } catch (err) {
//         setBookmarks((prev) =>
//           prev.filter((b) => b.tmdbId !== Number(item.id))
//         );
//         console.error("Failed to add bookmark:", err);
//       }
//     }
//   };

//   return (
//     <BookmarkContext.Provider
//       value={{ bookmarks, loading, isBookmarked, toggleBookmark }}
//     >
//       {children}
//     </BookmarkContext.Provider>
//   );
// }

// function useBookmark() {
//   const ctx = useContext(BookmarkContext);
//   if (!ctx) throw new Error("useBookmark must be used inside BookmarkProvider");
//   return ctx;
// }

// export default useBookmark;

import { createContext, useContext, useState, useEffect } from "react";
import useAuth from "./useAuth";

const BookmarkContext = createContext(null);

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const { token } = useAuth();

  // auth header helper
  const authHeader = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  useEffect(() => {
    if (!token) {
      setBookmarks([]);
      return;
    }
    fetch("/api/bookmarks", { headers: authHeader() })
      .then((r) => r.json())
      .then((data) => setBookmarks(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Failed to load bookmarks:", err));
  }, [token]);

  const isBookmarked = (id) => {
    return bookmarks.some((b) => Number(b.tmdbId) === Number(id));
  };

  const toggleBookmark = async (item) => {
    const alreadySaved = isBookmarked(item.id);

    if (alreadySaved) {
      setBookmarks((prev) =>
        prev.filter((b) => Number(b.tmdbId) !== Number(item.id))
      );
      try {
        await fetch(`/api/bookmarks/${item.id}`, {
          method: "DELETE",
          headers: authHeader(),
        });
      } catch (err) {
        console.error("Delete failed:", err);
      }
    } else {
      const tempEntry = { tmdbId: Number(item.id), ...item };
      setBookmarks((prev) => [...prev, tempEntry]);
      try {
        const res = await fetch("/api/bookmarks", {
          method: "POST",
          headers: authHeader(),
          body: JSON.stringify({
            tmdbId: Number(item.id),
            title: item.title,
            image: item.image,
            type: item.type,
            year: item.year,
            rating: item.rating,
          }),
        });
        if (!res.ok && res.status !== 409) {
          setBookmarks((prev) =>
            prev.filter((b) => Number(b.tmdbId) !== Number(item.id))
          );
          return;
        }
        const saved = await res.json();
        setBookmarks((prev) =>
          prev.map((b) => (Number(b.tmdbId) === Number(item.id) ? saved : b))
        );
      } catch (err) {
        setBookmarks((prev) =>
          prev.filter((b) => Number(b.tmdbId) !== Number(item.id))
        );
        console.error("Failed to add bookmark:", err);
      }
    }
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}

function useBookmarks() {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error("useBookmarks must be used inside BookmarkProvider");
  return ctx;
}

export default useBookmarks;