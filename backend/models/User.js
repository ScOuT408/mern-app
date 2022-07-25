const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },

  email: {
    type: String,
    required: [true, "Email is Required"],
  },

  password: {
    type: String,
    required: [true, "Password is Required"],
  },
});

module.exports = mongoose.model("User", UserSchema);
