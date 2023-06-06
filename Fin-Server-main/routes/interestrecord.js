const express = require("express");

const router = express.Router();

const Uinterestmodel = require("../models/uinterest.model");

// router.get("/interest/:email").get((req, res) => {
//   Uinterestmodel.findOne({ email: req.params.email })
//     .then((interest) => res.json(interest))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.post("/interest/add", (req, res) => {
//   const email = req.body.email;
//   const interest = req.body.interest;

// });

router.get("/find/:memail", async (req, res) => {
  const { memail } = req.params;
  console.log(memail);
  try {
    const user = await Uinterestmodel.findOne({ email: memail });

    if (user) {
      res.json({ founduser: "yes", interestuser: user });
    } else {
      res.json({ founduser: "no" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST route to create user record
router.post("/update", async (req, res) => {
  const { useremail, questionId } = req.body;
  console.log("User email" + useremail + " qid" + questionId);
  try {
    await Uinterestmodel.create({
      email: useremail,
      interest: [questionId],
    });
    console.log("User record created");
    res.json({ status: "ok" });
  } catch (error) {
    console.log("Error in creating user record" + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT route to update user record
router.put("/userchange", async (req, res) => {
  const { email, interest } = req.body;
  console.log("User email" + email + " interest" + interest);

  try {
    const user = await Uinterestmodel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User record not found" });
    }

    user.interest = interest;
    await user.save();

    res.sendStatus(200);
  } catch (error) {
    console.log("Error in updating" + error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get("/userinterest/:useremail", async (req, res) => {
  const { useremail } = req.params;
  console.log("email for interest is " + useremail);

  try {
    const user = await Uinterestmodel.findOne({ email: useremail });

    if (user) {
      res.json({ founduser: "yes", status: "ok", interestuser: user });
    } else {
      res.json({ founduser: "no" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});




module.exports = router;
