const mongoose = require("mongoose");

const recepieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide recepie name"],
    trim: true,
    maxlength: [120, "Recepie name should not be more than 120 characters"],
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
  // photos: [
  //   {
  //     id: {
  //       type: String,
  //       required: true,
  //     },
  //     secure_url: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
  // ratings: {
  //   type: Number,
  //   default: 0,
  // },
  // numberOfReviews: {
  //   type: Number,
  //   default: 0,
  // },
  // reviews: [
  //   {
  //     user: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "User",
  //     },
  //     name: {
  //       type: String,
  //       required: [true, "Please provide name"],
  //     },
  //     rating: {
  //       type: Number,
  //       required: [true, "Please provide rating"],
  //     },
  //     comment: {
  //       type: String,
  //     },
  //   },
  // ],
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  //   required: [true],
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = mongoose.model("Recepie", recepieSchema);
