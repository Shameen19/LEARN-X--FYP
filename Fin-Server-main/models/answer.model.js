const mongoose = require("mongoose");

const Answer = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  answeredat: {
    type: Date,
    default: new Date(),
  },
  upvotes: {
    type: [String],
    default: [],
  },
  answeredby: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  uemail: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("Answer", Answer);
module.exports = model;
