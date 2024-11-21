const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportlocalmongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Field for upload profile pic feature
  profilePicture: {
    url: { type: String, default: null }, // Full URL to the picture
    filename: { type: String, default: null }, // File name for internal tracking
  },
  // Field for checking the admin
  isAdmin: {
    // Add this field
    type: Boolean,
    default: false, // Default is false for regular users
  },
  passwordresetToken: {
    type: String,
    default: null,
  },
  TokenExpires: {
    type: String,
    default: null,
  },
  passwordResetAt: Date,
  passwordResetTokenExpires: Date,
});

userSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("User", userSchema);
