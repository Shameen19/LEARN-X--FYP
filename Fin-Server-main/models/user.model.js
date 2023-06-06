const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: {
    type: [String],
    required: true,
  },
  interest: {
    type: [String],
    required: true,
    default: [],
  },
  resetToken: { type: String, required: false },
  role: { type: String, required: true, default: "learner" },
  userinfo: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  picurl: {
    type: String,
    default: "",
  },
  credits: {
    type: Number,
    default: 100,
  },
  check: {
    type: Boolean,
    default: false,
  },
});

const Usermodel = mongoose.model("User", Users);

module.exports = Usermodel;
