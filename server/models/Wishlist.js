const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    movieId: { type: String, required: true },
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
