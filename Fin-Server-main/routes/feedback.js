const express = require("express");

const Feedback = require("../models/Feedback.model.js");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/checkrating", async (req, res) => {
  console.log("Data feedback recieved is ", req.body);
  const useremail = req.body.useremail;
  //console.log("User email is ", useremail);
  const dummyemail = "aaminashahid19@gmail.com";
  try {
    const data = await Feedback.findOne({ mentor: useremail });
    if (data) {
      console.log("Data i got from feedback", data);
      console.log("Data rating is ", data.totalrating);
      const rating = data.totalrating;
      console.log("Rating is", rating);
      res.status(200).json(rating);
    } else {
      console.log("No data found");
      res.status(200).json(0);
    }
  } catch (e) {
    console.log("Error at feedback", e);
  }
});

module.exports = router;
