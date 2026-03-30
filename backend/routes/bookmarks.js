const express = require("express");
const Bookmark = require("../models/Bookmark");

const router = express.Router();

// Get all bookmarks
router.get("/", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find().sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: "Failed to get bookmarks" });
  }
});

// Add a bookmark
router.post("/", async (req, res) => {
  const { tmdbId, title, image, type, year } = req.body;

  if (!tmdbId || !title || !type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check if already bookmarked
    const existing = await Bookmark.findOne({ tmdbId });
    if (existing) {
      return res.status(409).json({ error: "Already bookmarked" });
    }

    const bookmark = new Bookmark({ tmdbId, title, image, type, year });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(500).json({ error: "Failed to add bookmark" });
  }
});

// Delete a bookmark by tmdbId
router.delete("/:id", async (req, res) => {
  try {
    await Bookmark.findOneAndDelete({ tmdbId: req.params.id });
    res.json({ message: "Bookmark removed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete bookmark" });
  }
});

module.exports = router;
