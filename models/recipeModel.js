const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide Recipe name"],
    trim: true,
    maxlength: [120, "Recipe name should not be more than 120 characters"],
  },
  description: {
    type: String,
  },
  ingredients: [
    {
      type: String,
    },
  ],
  electronic_instruments: [
    {
      type: String,
    },
  ],
  preperation_time: {
    type: String,
  },
  precautions: {
    type: String,
  },
  nutrition_value: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true],
    select: false
  },
  userEmail: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
