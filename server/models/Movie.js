// models/Movie.js
const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  rating: { type: Number, required: true },
  photo: { type: String, required: true },
  genre: { type: String, required: true },
});

module.exports = mongoose.model("Movie", MovieSchema);
