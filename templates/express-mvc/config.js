require("dotenv").config();

module.exports = {
  HOST: process.env.HOST || "0.0.0.0",
  PORT: parseInt(process.env.PORT, 10) || 3000,
  DEBUG: (process.env.DEBUG || "true").trim().toLowerCase() === "true",
};
