const mongoose = require("mongoose");

// Reference model — shows how a schema registers with mongoose. Not wired
// to any route by default; import it where needed, e.g.:
// const User = require("../models/User");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
