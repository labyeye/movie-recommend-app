const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth'); // Ensure this path is correct
const Wishlist = require('../models/Wishlist'); // Adjust to your actual model path

// Add movie to wishlist
router.post('/add', verifyToken, async (req, res) => {
    const { movieId } = req.body;
    const userId = req.user.id;

    if (!movieId) {
        return res.status(400).json({ message: 'Movie ID is required.' });
    }

    try {
        const existingEntry = await Wishlist.findOne({ userId, movieId });
        if (existingEntry) {
            return res.status(400).json({ message: 'Movie already in wishlist.' });
        }

        const wishlistItem = new Wishlist({ userId, movieId });
        await wishlistItem.save();
        return res.status(201).json({ message: 'Movie added to wishlist successfully.' });
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});
router.get('/getwish', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlistItems = await Wishlist.find({ userId }).populate('movieId', 'name rating'); // Populate name and rating from Movie collection

        if (!wishlistItems.length) {
            return res.status(404).json({ message: 'No items found in wishlist.' });
        }

        res.status(200).json(wishlistItems);
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


module.exports = router;
