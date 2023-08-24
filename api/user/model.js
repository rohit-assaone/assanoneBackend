const mongoose  = require("mongoose");
const jwt =  require("jsonwebtoken");
const userSceham = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true
    },
    username: {
      type: String,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      trim: true,
      required: true
    },
    mobile: {
      type: Number,
    },
    role: {
      type: String,
      required: true,
      default: "TYPE_POSP",
    },
  },
  { timestamps: true }
);




const User = new mongoose.model("Uuser", userSceham);

module.exports = User;
