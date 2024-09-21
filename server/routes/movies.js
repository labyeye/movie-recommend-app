// routes/movies.js
const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// Fetch movies grouped by genre
router.get("/moviedata", async (req, res) => {
  try {
    const movies = await Movie.find(); // Fetch all movies
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
