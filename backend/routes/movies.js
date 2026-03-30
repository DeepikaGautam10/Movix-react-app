const express = require("express");
const axios = require("axios");

const router = express.Router();

let movieCache = {};
const CACHE_TTL = 5 * 60 * 1000;

router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const cacheKey = `movie_page_${page}`;

  if (movieCache[cacheKey] && Date.now() - movieCache[cacheKey].time < CACHE_TTL) {
    return res.json(movieCache[cacheKey].data);
  }

  try {
    const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
      params: {
        api_key: process.env.TMDB_API_KEY,
        page: page,
      },
    });

    const movies = response.data.results.map((m) => ({
      id: m.id,
      title: m.title,           
      image: m.poster_path
        ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
        : null,
      backdrop: m.backdrop_path
        ? `https://image.tmdb.org/t/p/w780${m.backdrop_path}`
        : null,
      year: m.release_date     
        ? m.release_date.split("-")[0]
        : "N/A",
      rating: Math.round(m.vote_average * 10) / 10,
      overview: m.overview,
      type: "movie",            
    }));

    const result = {
      movies,
      page: response.data.page,
      totalPages: response.data.total_pages,
    };

    movieCache[cacheKey] = { data: result, time: Date.now() };

    res.json(result);
  } catch (err) {
    console.error("TMDB movie error:", err.message);
    res.status(500).json({ error: "Failed to fetch movie from TMDB" });
  }
});

// search movie
router.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) return res.json({ movies: [] });

  try {
    const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: query,
      },
    });

    const movies = response.data.results.map((m) => ({
      id: m.id,
      title: m.title,           
      image: m.poster_path
        ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
        : null,
      year: m.release_date      
        ? m.release_date.split("-")[0]
        : "N/A",
      rating: Math.round(m.vote_average * 10) / 10,
      type: "movie",            
    }));

    res.json({ movies });
  } catch (err) {
    console.error("TMDB search error:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;