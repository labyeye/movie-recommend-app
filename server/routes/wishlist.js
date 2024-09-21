const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { verifyToken } = require('../middleware/auth'); // Middleware to verify token

// Add to Liked Movies
router.post('/add', verifyToken, async (req, res) => {
    const { movieId } = req.body;
    const userId = req.user.id; // Assuming you have the user ID from the token

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if movie is already liked
        if (!user.wishlist.includes(movieId)) {
            user.wishlist.push(movieId);
            await user.save();
        }

        res.status(200).json({ message: 'Movie added to liked movies' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Liked Movies
router.get('/', verifyToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).populate('wishlist');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
