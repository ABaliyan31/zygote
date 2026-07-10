const mongoose = require("mongoose");
const config = require("./config");

// Non-blocking: server still starts and non-DB routes (e.g. /health) still
// work even if Mongo isn't reachable yet. Points at local Mongo by default,
// but any MongoDB Atlas connection string works the same way — just set
// MONGO_URI in .env.
mongoose
  .connect(config.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log(`Connected to MongoDB at ${config.MONGO_URI}`))
  .catch((err) => {
    console.warn(
      `MongoDB connection failed (${err.message}). Set MONGO_URI in .env to a running local Mongo instance or an Atlas connection string.`
    );
  });

module.exports = mongoose;
