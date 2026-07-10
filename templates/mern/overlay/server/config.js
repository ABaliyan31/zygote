require("dotenv").config();

module.exports = {
  HOST: process.env.HOST || "0.0.0.0",
  PORT: parseInt(process.env.PORT, 10) || 3000,
  DEBUG: (process.env.DEBUG || "true").trim().toLowerCase() === "true",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/mern-app",
};
