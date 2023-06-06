const mongoose = require("mongoose");

const Question = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    uemail: {
      type: String,
      default: "anonymous",
    },
    description: {
      type: String,
      required: true,
    },
    filesurl: {
      type: [String],
    },
    upvotes: {
      type: [String],
      default: [],
    },
    answers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Answer",
    },
    tags: {
      type: [String],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    totalviews: {
      type: Number,
      default: 0,
    },
  },
  { collection: "questions" }
);

const model = mongoose.model("Questions", Question);

module.exports = model;
