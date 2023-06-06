const express = require("express");
const router = express.Router();
const Transaction = require("../models/transactions");

router.get("/createchart", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const creditsEarned = transactions
      .filter((t) => t.mode === "credit")
      .map((t) => t.creditscount);
    const creditsUsed = transactions
      .filter((t) => t.mode === "debit")
      .map((t) => t.creditscount);
    const labels = transactions.map((t) => t.date.toISOString().slice(0, 10));
    console.log(creditsEarned);
    console.log("-------------labels----------------");
    console.log(labels);
    console.log("----------credits used----------------");
    console.log(creditsUsed);
    res.json({ creditsEarned, creditsUsed, labels });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
