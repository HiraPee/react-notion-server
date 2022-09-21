const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    rquired: true,
    nbique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("USER", userSchema);
