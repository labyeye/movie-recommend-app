const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const movieRoutes = require('./routes/movies'); // Ensure the correct path
const wishRoutes = require('./routes/wishlist'); // Ensure the correct path

require("dotenv").config();

const app = express();
app.use(bodyParser.json()); // Body parser middleware to handle JSON requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("api/wishlist", wishRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
