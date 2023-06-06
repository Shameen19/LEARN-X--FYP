const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Transaction = require("../models/transactions");
const nodemailer = require("nodemailer");
let receiveremail;
let deductedcredits;
let amountinPKR;

router.post("/withdrawamount", async (req, res) => {
  const email = req.body.email;
  receiveremail = req.body.email;
  const amount = req.body.amount;
  const captcha = req.body.recaptchavalue;
  console.log("Printing email");
  console.log(email);
  if (!amount) {
    res.status(203).json("Please enter amount");
  }
  if (!captcha) {
    console.log("Printing reciever email");
    console.log(receiveremail);
    res.status(204).json("Please check tha captcha box");
  } else {
    try {
      const user = await User.findOne({ email });
      console.log(user);
      const usercredits = user.credits;
      console.log("--Printing user credits");
      console.log(usercredits);
      console.log("Printing total amount");
      console.log(amount);
      if (usercredits < amount) {
        console.log("Insuffiencet balance");
        res.status(205).send("Insuffiecent credits to redeem");
      } else if (amount <= usercredits && usercredits >= 100) {
        const totalamountinPKR = amount / 10;
        console.log("Printing total amount in PKR", totalamountinPKR);
        const replacecredits = usercredits - amount;
        deductedcredits = amount;
        amountinPKR = totalamountinPKR;
        console.log("Credits equal in PKR", totalamountinPKR);
        console.log("Credits to be replaced in User is ", replacecredits);
        const data = await User.findOneAndUpdate(
          { email },
          { credits: replacecredits },
          { new: true }
        );
        console.log("Printing data");
        console.log(data);

        const transitionaddition = await Transaction.create({
          email: email,
          transactiontype: "credits redeemed",
          details: "redeemed as cash",
          creditscount: amount,
          mode: "debit",
        });
        console.log("Dispalying transaction details");
        console.log(transitionaddition);

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "shameen12319@gmail.com",
            pass: "vgnjawchqoxrkbwc",
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        // Define the email options
        const mailOptions = {
          from: '"Learn-X" <noreply@myapp.com>',
          to: receiveremail,
          subject: "Veryifying the deduction of credits from your account",
          text: "Credits are deducted from your account",
          html: `<p>Credits are deducted from your account</p>
                 <p>Following amount of credits is deducted from your account ${deductedcredits} </p>
                 <p>Total amount of credits in terms of PKR is  ${amountinPKR} </p>`,
        };
        await transporter.sendMail(mailOptions);
        console.log("Credits have been deducted from your account");
        res.status(206).json(data);
      }
    } catch (err) {
      console.log(err);
      res.status(404).json("Error occured");
    }
  }
});

router.post("/viewdata", async (req, res) => {
  const { email } = req.body;
  try {
    const data = await User.findOne({ email });
    console.log("Get credits data");
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
