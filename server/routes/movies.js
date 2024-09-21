const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

router.post("/moviedata", async (req, res) => {
    const { movieIds } = req.body;
    if (!Array.isArray(movieIds) || movieIds.length === 0) {
        return res.status(400).json({ message: "Invalid movie IDs" });
    }
    try {
        const movies = await Movie.find({ _id: { $in: movieIds } });

        if (movies.length === 0) {
            return res.status(404).json({ message: "No movies found for the provided IDs" });
        }

        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
