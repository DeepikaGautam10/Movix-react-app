const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Bookmark", bookmarkSchema);