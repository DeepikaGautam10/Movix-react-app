const express = require("express");
const axios = require("axios");

const router = express.Router();

let tvCache = {};
const CACHE_TTL = 5 * 60 * 1000;

router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const cacheKey = `tv_page_${page}`;

  if (tvCache[cacheKey] && Date.now() - tvCache[cacheKey].time < CACHE_TTL) {
    return res.json(tvCache[cacheKey].data);
  }

  try {
    const response = await axios.get("https://api.themoviedb.org/3/tv/popular", {
      params: {
        api_key: process.env.TMDB_API_KEY,
        page: page,
      },
    });

    const shows = response.data.results.map((s) => ({
      id: s.id,
      title: s.name,
      image: s.poster_path
        ? `https://image.tmdb.org/t/p/w500${s.poster_path}`
        : null,
      backdrop: s.backdrop_path
        ? `https://image.tmdb.org/t/p/w780${s.backdrop_path}`
        : null,
      year: s.first_air_date 
        ? s.first_air_date.split("-")[0] 
        : "N/A",
      rating: Math.round(s.vote_average * 10) / 10,
      overview: s.overview,
      type: "tv",
    }));

    const result = {
      shows,
      page: response.data.page,
      totalPages: response.data.total_pages,
    };

    tvCache[cacheKey] = { data: result, time: Date.now() };

    res.json(result);
  } catch (err) {
    console.error("TMDB tv error:", err.message);
    res.status(500).json({ error: "Failed to fetch TV shows from TMDB" });
  }
});

// search tv
router.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) return res.json({ shows: [] });

  try {
    const response = await axios.get("https://api.themoviedb.org/3/search/tv", {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: query,
      },
    });

    const shows = response.data.results.map((s) => ({
      id: s.id,
      title: s.name,
      image: s.poster_path
        ? `https://image.tmdb.org/t/p/w500${s.poster_path}`
        : null,
      year: s.first_air_date 
        ? s.first_air_date.split("-")[0] 
        : "N/A",
      rating: Math.round(s.vote_average * 10) / 10,
      type: "tv",
    }));

    res.json({ shows });
  } catch (err) {
    console.error("TMDB tv search error:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;