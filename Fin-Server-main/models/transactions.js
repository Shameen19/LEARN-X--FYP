const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  email: {
    type: "String",
  },
  transactiontype: {
    type: "String",
  },
  details: {
    type: "String",
  },
  creditscount: {
    type: Number,
  },
  mode: {
    type: "String",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Transaction = new mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
