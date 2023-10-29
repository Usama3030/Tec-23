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

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

// Method to validate the password
// userSchema.methods.isValidPassword = async function (password) {
//   try {
//     const isPasswordValid = await bcrypt.compare(password, this.password);
//     return isPasswordValid;
//   } catch (err) {
//     throw err;
//   }
// };

const User = mongoose.model("User", userSchema);
module.exports = User;
