const mongoose = require("mongoose");

const payoutSchema = new mongoose.Schema({
  email: {
    type: "String",
  },
  BankAccountName: {
    type: "String",
  },
  BankAccountNumber: {
    type: Number,
  },
  PostalCode: {
    type: Number,
  },
});

const Payout = new mongoose.model("Payout", payoutSchema);
module.exports = Payout;
