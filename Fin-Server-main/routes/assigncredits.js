const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/getcheckvalue", async (req, res) => {
  const { email } = req.body;
  try {
    const check = await User.findOne({ email });
    console.log(check.check);
    res.status(200).json(check);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error occured");
  }
});

router.post("/assigncredits", async (req, res) => {
  const { email } = req.body;
  try {
    console.log("Error about to occure");
    const checkcredits = await User.findOneAndUpdate(
      { email },
      { credits: 10, check: true },
      { new: true }
    );
    console.log(checkcredits.credits);
    res.status(200).json(checkcredits);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error occured");
  }
});

module.exports = router;
