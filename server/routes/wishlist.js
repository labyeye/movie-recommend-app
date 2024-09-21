const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth'); // Ensure this path is correct
const Wishlist = require('../models/Wishlist'); // Adjust to your actual model path

router.post('/add', verifyToken, async (req, res) => {
    console.log('Received request to add to wishlist:', req.body);
    const { movieId } = req.body;
    const userId = req.user.id; // Assuming req.user is populated by your verifyToken middleware

    if (!movieId) {
        return res.status(400).json({ message: 'Movie ID is required.' });
    }

    try {
        // Check if the movie is already in the wishlist
        const existingEntry = await Wishlist.findOne({ userId, movieId });
        if (existingEntry) {
            return res.status(400).json({ message: 'Movie already in wishlist.' });
        }

        // Create a new wishlist entry
        const wishlistItem = new Wishlist({ userId, movieId });
        await wishlistItem.save();

        return res.status(201).json({ message: 'Movie added to wishlist successfully.' });
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
