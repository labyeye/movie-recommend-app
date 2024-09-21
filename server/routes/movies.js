const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Movie = require("../models/Movie");
const auth = require("../middleware/auth");

router.post("/:id/like", auth, async (req, res) => {
    try {
      const userId = req.user.id;
      const movieId = req.params.id;
  
      // Check if the movie exists
      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).json({ msg: "Movie not found" });
      }
  
      // Check if the user already liked the movie
      const user = await User.findById(userId);
      if (user.likedMovies.includes(movieId)) {
        return res.status(400).json({ msg: "You already liked this movie" });
      }
  
      // Add movie to user's liked movies
      user.likedMovies.push(movieId);
      await user.save();
  
      res.json({ msg: "Movie liked", likedMovies: user.likedMovies });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
  // New route to get liked movies
  router.get("/:id/liked", auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate("likedMovies");
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.json(user.likedMovies); // Return the liked movies
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  

router.get("/", async (req, res) => {
    try {
      const movies = await Movie.find(); // Fetch movies from the database
      res.json(movies); // Send JSON response
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  

module.exports = router;
