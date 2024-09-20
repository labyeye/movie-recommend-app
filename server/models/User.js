const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likedMovies: { type: [String], default: [] },  // Movies the user liked
  watchedMovies: { type: [String], default: [] }, // Movies the user watched
  genrePreferences: { type: [String], default: [] }, // Preferred genres
});

module.exports = mongoose.model("User", UserSchema);
