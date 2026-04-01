const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tmdbId: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    enum: ["movie", "tv"],
    required: true,
  },
  year: {
    type: String,
    default: "N/A",
  },
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// unique per user — same movie can be bookmarked by different users
bookmarkSchema.index({ userId: 1, tmdbId: 1 }, { unique: true });
module.exports = mongoose.model("Bookmark", bookmarkSchema);