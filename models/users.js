const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Businesses = require("./business");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  businesses: [
    {
      business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Businesses", // Reference the Business model
        required: true,
      },
      roles: [{ type: String, required: true }],
    },
  ],
  isVerified: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
