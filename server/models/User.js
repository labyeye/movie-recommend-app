// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  likedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }], // Reference to Movie model
});

module.exports = mongoose.model("User", UserSchema);
