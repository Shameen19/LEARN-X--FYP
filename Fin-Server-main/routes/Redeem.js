const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Transaction = require("../models/transactions");

async function sendResetPasswordEmail(email) {
  // Create a JWT that expires in one hour

  // Set up the email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lightlime145@gmail.com",
      pass: "dhatpdlmuhhlnuzp",
    },
  });

  // Define the email options
  const mailOptions = {
    from: '"My App" <noreply@myapp.com>',
    to: email,
    subject: "Reset your password",
    text: `Click the link to reset your password: http://localhost:3000/auth/reset/${rtoken}`,
    html: `<p> You have reddemed gift card:</p>`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}
router.post("/redeemgiftcard", async (req, res) => {
  const email = req.body.email;
  const credits = req.body.credits;
  const quantity = req.body.quantity;
  const totalcredits = credits * quantity;
  console.log("Total credits", totalcredits);
  try {
    const creditscheck = await User.findOne({ email });
    const usercredits = creditscheck.credits;
    if (usercredits < totalcredits) {
      console.log("insufficient credits");
      res.status(203).json("Insufficent Balance");
    } else if (usercredits >= totalcredits) {
      const remainingcredits = usercredits - totalcredits;
      console.log("Remaining credits", remainingcredits);

      const data = await User.findOneAndUpdate(
        { email },
        { credits: remainingcredits },
        { new: true }
      );
      console.log("Printing user data");
      console.log(data);

      mailsend(email, "Redeemed Gift Card", "<h1> YOur Gift Card is Here <h1>");

      const transitionaddition = await Transaction.create({
        email: email,
        transactiontype: "credits redeemed",
        details: "redeemed as gift card",
        creditscount: 0,
        mode: "debit",
      });
      console.log("Dispalying transaction details");
      console.log(transitionaddition);

      res.status(200).json("Sufficent credits");
    }
  } catch (err) {
    console.log("Error", err);
    res.status(400).json("ERROR occured");
  }
});

router.post("/redeemgiftcard", async (req, res) => {
  const email = req.body.email;
  const credits = req.body.credits;
  const quantity = req.body.quantity;
  const totalcredits = credits * quantity;
  console.log("Total credits", totalcredits);
  try {
    const creditscheck = await User.findOne({ email });
    const usercredits = creditscheck.credits;
    if (usercredits < totalcredits) {
      console.log("insufficient credits");
      res.status(203).json("Insufficent Balance");
    } else if (usercredits >= totalcredits) {
      const remainingcredits = usercredits - totalcredits;
      console.log("Remaining credits", remainingcredits);

      const data = await User.findOneAndUpdate(
        { email },
        { credits: remainingcredits },
        { new: true }
      );
      console.log("Printing user data");
      console.log(data);

      const transitionaddition = await Transaction.create({
        email: email,
        transactiontype: "credits redeemed",
        details: "redeemed as gift card",
        creditscount: 0,
        mode: "debit",
      });
      console.log("Dispalying transaction details");
      console.log(transitionaddition);

      res.status(200).json("Sufficent credits");
    }
  } catch (err) {
    console.log("Error", err);
    res.status(400).json("ERROR occured");
  }
});

router.post("/redeemgiftcard2", async (req, res) => {
  const email = req.body.email;
  const credits = req.body.credits;
  const quantity = req.body.quantity2;
  const totalcredits = credits * quantity;
  console.log("Total credits", totalcredits);
  try {
    const creditscheck = await User.findOne({ email });
    const usercredits = creditscheck.credits;
    if (usercredits < totalcredits) {
      console.log("insufficient credits");
      res.status(203).json("Insufficent Balance");
    } else if (usercredits >= totalcredits) {
      const remainingcredits = usercredits - totalcredits;
      console.log("Remaining credits", remainingcredits);

      const data = await User.findOneAndUpdate(
        { email },
        { credits: remainingcredits },
        { new: true }
      );
      console.log("Printing user data");
      console.log(data);

      const transitionaddition = await Transaction.create({
        email: email,
        transactiontype: "credits redeemed",
        details: "redeemed as gift card",
        creditscount: 0,
        mode: "debit",
      });
      console.log("Dispalying transaction details");
      console.log(transitionaddition);

      res.status(200).json("Sufficent credits");
    }
  } catch (err) {
    console.log("Error", err);
    res.status(400).json("ERROR occured");
  }
});

router.post("/redeemgiftcard3", async (req, res) => {
  const email = req.body.email;
  const credits = req.body.credits;
  const quantity = req.body.quantity3;
  console.log("quantity", quantity);
  const totalcredits = credits * quantity;
  console.log("Total credits", totalcredits);

  try {
    console.log("error");
    const creditscheck = await User.findOne({ email });
    console.log("error1");
    const usercredits = creditscheck.credits;
    console.log("user credits", usercredits);
    console.log("error2");
    if (usercredits < totalcredits) {
      console.log("insufficient credits");
      res.status(203).json("Insufficent Balance");
    } else if (usercredits >= totalcredits) {
      const remainingcredits = usercredits - totalcredits;
      console.log("Remaining credits", remainingcredits);

      const data = await User.findOneAndUpdate(
        { email },
        { credits: remainingcredits },
        { new: true }
      );
      console.log("Printing user data");
      console.log(data);

      const transitionaddition = await Transaction.create({
        email: email,
        transactiontype: "credits redeemed",
        details: "redeemed as gift card",
        creditscount: 0,
        mode: "debit",
      });
      console.log("Dispalying transaction details");
      console.log(transitionaddition);

      res.status(200).json("Sufficent credits");
    }
  } catch (err) {
    console.log("Error", err);
    res.status(400).json("ERROR occured");
  }
});

router.post("/redeemgiftcard4", async (req, res) => {
  const email = req.body.email;
  const credits = req.body.credits;
  const quantity = req.body.quantity4;
  const totalcredits = credits * quantity;
  console.log("Total credits", totalcredits);
  try {
    const creditscheck = await User.findOne({ email });
    const usercredits = creditscheck.credits;
    if (usercredits < totalcredits) {
      console.log("insufficient credits");
      res.status(203).json("Insufficent Balance");
    } else if (usercredits >= totalcredits) {
      const remainingcredits = usercredits - totalcredits;
      console.log("Remaining credits", remainingcredits);

      const data = await User.findOneAndUpdate(
        { email },
        { credits: remainingcredits },
        { new: true }
      );
      console.log("Printing user data");
      console.log(data);

      const transitionaddition = await Transaction.create({
        email: email,
        transactiontype: "credits redeemed",
        details: "redeemed as gift card",
        creditscount: 0,
        mode: "debit",
      });
      console.log("Dispalying transaction details");
      console.log(transitionaddition);

      res.status(200).json("Sufficent credits");
    }
  } catch (err) {
    console.log("Error", err);
    res.status(400).json("ERROR occured");
  }
});

module.exports = router;
