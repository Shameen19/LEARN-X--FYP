const mongoose = require("mongoose");

const complaintschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "no actions",
  },
});
const ComplaintSchema = new mongoose.model("ComplaintSchema", complaintschema);

module.exports = ComplaintSchema;
