const express = require("express");

const mongoose = require("mongoose");
const Question = require("../models/questions.model.js");
const router = express.Router();

router.get("/:query", async (req, res) => {
  const query = req.params.query;
  // console.log("query is " + query);
  try {
    const regex = new RegExp(query, "i");

    const questions = await Question.find({
      $or: [{ title: regex }, { tags: regex }],
    });

    res.status(200).json({ status: "ok", questions: questions });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
