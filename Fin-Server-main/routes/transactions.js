const express = require("express");
const router = express.Router();
const transaction = require("../models/transactions");

router.post("/viewtransaction", async (req, res) => {
  const { email } = req.body;
  try {
    const data = await transaction.find({ email });
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json("Error occured while fetching the record");
  }
});

module.exports = router;
