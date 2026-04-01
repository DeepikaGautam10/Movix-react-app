const express = require("express");
const Bookmark = require("../models/Bookmark");

const router = express.Router();

// Get all bookmarks
router.get("/", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: "Failed to get bookmarks" });
  }
});

// Add a bookmark
router.post("/", async (req, res) => {
  const { tmdbId, title, image, type, year, rating } = req.body;

  if (!tmdbId || !title || !type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check if already bookmarked
    const existing = await Bookmark.findOne({ userId: req.user._id,
      tmdbId: Number(tmdbId), });
    if (existing) {
      return res.status(409).json({ error: "Already bookmarked" });
    }

    const bookmark = new Bookmark({ userId: req.user._id, tmdbId: Number(tmdbId), title, image, type, year, rating,});
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(500).json({ error: "Failed to add bookmark" });
  }
});

// Delete a bookmark by tmdbId
router.delete("/:id", async (req, res) => {
  try {
     const deleted = await Bookmark.findOneAndDelete({
      userId: req.user._id,
      tmdbId: Number(req.params.id),
    });

    if (!deleted) {
      return res.status(404).json({ error: "Bookmark not found" });
    }

    res.json({ message: "Bookmark removed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete bookmark" });
  }
});

module.exports = router;
