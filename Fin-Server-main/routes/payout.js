const express = require("express");

const Payout = require("../models/Payout");
const router = express.Router();

router.post("/addpayout", async (req, res) => {
  const { email, bankaccountname, bankaccountnumber, postalcode } = req.body;
  console.log(email);
  console.log(bankaccountname);
  console.log(bankaccountnumber);
  console.log(postalcode);
  if (!bankaccountname || !bankaccountnumber || !postalcode) {
    res.status(203).json("Please enter all the required fields");
  }
  const check = await Payout.findOne({ email });
  if (check) {
    res.status(201).json("Your payout is already present");
  } else if (!check) {
    const payout = await Payout.create({
      email: email,
      BankAccountName: bankaccountname,
      BankAccountNumber: bankaccountnumber,
      PostalCode: postalcode,
    });
    if (payout) {
      res.status(200).json({
        email: payout.email,
        bankaccountname: payout.bankaccountname,
        bankaccountnumber: payout.bankaccountnumber,
        postalcode: payout.postalcode,
      });
    } else {
      res.status(404).json("Error occured");
    }
  }
});

router.post("/alreadysubmitpayout", async (req, res) => {
  const email = req.body.email;
  console.log(email);
  const check = await Payout.findOne({ email });
  if (check) {
    res.status(200).json(check);
  } else {
    res.status(203).json("Payout details not found");
  }
});

router.post("/editpayout", async (req, res) => {
  const { email } = req.body;
  console.log("printing req.body");
  console.log(req.body);
  console.log("printing data");
  console.log(req.body.editbankname);
  console.log(req.body.editbanknumber);
  console.log(req.body.editpostalcode);
  try {
    const data = await Payout.findOneAndUpdate(
      { email },
      {
        BankAccountName: req.body.editbankname,
        BankAccountNumber: req.body.editbanknumber,
        PostalCode: req.body.editpostalcode,
      },
      { new: true }
    );
    console.log(data);
    //
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error occured");
  }
});

module.exports = router;
