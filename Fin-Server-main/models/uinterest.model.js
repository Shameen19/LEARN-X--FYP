const mongoose = require("mongoose");

const Uinterest = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  interest: {
    type: [String],
    required: true,
    default: [],
  },
});

const Uinterestmodel = mongoose.model("Uinterest", Uinterest);
module.exports = Uinterestmodel;
