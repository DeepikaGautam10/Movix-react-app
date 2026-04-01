require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const protect = require("./middleware/auth");

const movieRoutes = require("./routes/movies");
const tvRoutes = require("./routes/tv");
const bookmarkRoutes = require("./routes/bookmarks");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/movixdb")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/tv", tvRoutes);
app.use("/bookmarks",protect, bookmarkRoutes);

app.get("/", (req, res) => res.json({ message: "API running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));





