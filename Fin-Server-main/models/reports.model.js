const mongoose = require("mongoose");

const reportschema = new mongoose.Schema({
  comments: {
    type: String,
    required: true,
  },
  questionId: {
    type: String,
    required: true,
  },
  aguseremail: {
    type: String,
    required: true,
  },
  reportype: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "In-Review",
  },
  reportby: {
    type: String,
    required: true,
  },
});
const ReportSchema = new mongoose.model("ReportSchema", reportschema);

module.exports = ReportSchema;
