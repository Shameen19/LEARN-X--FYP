const express = require("express");
const router = express.Router();
const Transaction = require("../models/transactions");
const User = require("../models/user.model");
const Stripe = require("stripe")(
  "sk_test_51Mqj7DEYINMUWJgYm54rRNuJtPc4Sc9DtNFaIdc0hsoa3qHXfPMJhVAL5dv9KeLpjk1Ja8pQ5IgUmdHyBdmCewJH00x3ZWkdic"
);

router.post("/payment", async (req, res) => {
  let status, error;
  const { token, amount, date, check } = req.body;
  console.log("your amount is ", amount);
  const token2 = token;
  try {
    if (check === true) {
      await Stripe.charges.create({
        source: token.id,
        amount,
        currency: "pkr",
      });
      const email = token2.email;
      const transactiontype = "credits purchased";
      const details = "credits purchased";
      var creditscount = "";
      if (amount === 50000) {
        creditscount = "50";
        const data = await User.findOne({ email: email });
        console.log(data);
        const updatecredits = data.credits;
        console.log("Data credits are" + data.credits);
        const data2 = await User.findOneAndUpdate(
          { email },
          {
            credits: updatecredits + 50,
          },
          {
            new: true,
          }
        );
        console.log("Updated credits", data2.credits);
      } else if (amount === 100000) {
        creditscount = "100";
        const data = await User.findOne({ email });
        console.log(data);
        const updatecredits = data.credits;
        const data2 = await User.findOneAndUpdate(
          { email },
          {
            credits: updatecredits + 100,
          },
          {
            new: true,
          }
        );
        console.log("Updated credits", data2.credits);
      }
      const mode = "credit";
      const transactiondate = date;
      const transaction = new Transaction({
        email,
        transactiontype,
        details,
        creditscount,
        mode,
        date: transactiondate,
      });
      await transaction.save();
      console.log("-------------User data---------");
      console.log(email);
      console.log(transactiontype);
      console.log(details);
      console.log(creditscount);
      console.log(mode);
      console.log(date);
      res.status(200).json("success");
    } else {
      console.log("Not found");
    }
  } catch (err) {
    console.error(err);
    status = "Failure";
  }
});

module.exports = router;
