const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: [validator.isEmail, "Please Enter a valid Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: [6, "Password should be atleast 6 characters"],
    select: false,
  }
});

// Encrypt Password before save 
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Exporting the Model
module.exports = mongoose.model("User", userSchema);
