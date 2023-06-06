const mongoose = require("mongoose");

const feedback = new mongoose.Schema({
  learner: {
    type: String,
  },
  mentor: {
    type: String,
  },
  Rating: {
    type: Number,
    default: 0,
  },
  Review: {
    type: String,
    default: null,
  },
  totalrating: {
    type: Number,
  },
});
const Feedback = mongoose.model("Feedback", feedback);
module.exports = Feedback;
