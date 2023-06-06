const express = require("express");

const mongoose = require("mongoose");
const Answer = require("../models/answer.model.js");
const Question = require("../models/questions.model.js");
const Complaint = require("../models/complaints.js");
const Usermodel = require("../models/user.model.js");
const Transaction = require("../models/transactions.js");
//const Celebrity = require('../models/celebrity.model.js');

const router = express.Router();

// router.post("/add", async (req, res) => {
//   console.log(JSON.stringify(req.body) + "requested ads");
//   try {
//     const resf = await Answer.create({
//       title: req.body.title,
//       description: req.body.description,
//       upvotes: req.body.upvotes,
//       answeredby: req.body.answeredby,
//       questionid: req.body.questionid,
//       uemail: req.body.uemail,
//     });
//     res.json({ status: "ok" });
//   } catch (err) {
//     console.log(err.message);
//     res.send({ message: err.message });
//   }
// });

router.post("/:questionId", async (req, res) => {
  const { questionId } = req.params;
  const { title, description, answeredby, uemail, uid, urole } = req.body;
  console.log("userorle:" + urole);

  const answer = new Answer({
    title,
    description,
    answeredby,
    uemail,
    uid,
    role: urole,
  });

  // Save the answer to the database
  await answer
    .save()
    .then((savedAnswer) => {
      // Update the question to reference the new answer
      Question.findByIdAndUpdate(
        questionId,
        { $push: { answers: savedAnswer._id } },
        { new: true },
        (err, updatedQuestion) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send({ message: "Answer added successfully", updatedQuestion });
          }
        }
      );
    })
    .catch((err) => {
      res.json({ message: err.message });
    });
});

router.get("/tabledata/:email", async (req, res) => {
  const { uemail } = req.params;

  // Calculate start and end dates for the 3-day period
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 3);

  try {
    // Get total number of questions asked by user in last 3 days
    const questionsCount = await Question.countDocuments({
      uemail,
      createdAt: { $gte: startDate, $lte: endDate },
    });

    // Get total number of answers given by user in last 3 days
    const answersCount = await Answer.countDocuments({
      uemail,
      answeredat: { $gte: startDate, $lte: endDate },
    });

    // Group results by day
    const results = await Question.aggregate([
      {
        $match: {
          uemail,
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          questionsCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "answers",
          let: { date: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$uemail", uemail] },
                    { $eq: [{ $year: "$answeredat" }, "$$date.year"] },
                    { $eq: [{ $month: "$answeredat" }, "$$date.month"] },
                    { $eq: [{ $dayOfMonth: "$answeredat" }, "$$date.day"] },
                  ],
                },
              },
            },
            {
              $count: "answersCount",
            },
          ],
          as: "answersCount",
        },
      },
      {
        $addFields: {
          answersCount: {
            $ifNull: [{ $arrayElemAt: ["$answersCount.answersCount", 0] }, 0],
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day",
            },
          },
          questionsCount: 1,
          answersCount: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    // Send results to the client
    res.json({
      questionsCount,
      answersCount,
      results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/getquestion/", async (req, res) => {
  console.log(req.body.qid);
  try {
    const resj = await Answer.findOne({ _id: req.body.qid }).populate(
      "Questions"
    );

    res.json({ ids: resj.question.title });
  } catch (err) {
    console.log(err.message);
    res.json({ message: err.message });
  }
});

router.get("/vview/:id", async (req, res) => {
  const answerId = req.params.id;
  console.log("ANswer" + answerId);
  try {
    const resj = await Answer.findOne({ _id: answerId });

    console.log(resj);

    res.json({ status: "here" });
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/checkupvote/:id", async (req, res) => {
  try {
    const answerId = req.params.id;
    const userEmail = req.body.email;
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: "answer not found" });
    }

    const hasUpvoted = answer.upvotes.find((email) => email === userEmail);

    if (hasUpvoted) {
      return res.json({ message: "upvoted" });
    } else {
      return res.json({ message: "notupvoted" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
    console.log(error.message);
  }
});

router.post("/:id/upvote", async (req, res) => {
  try {
    const answerId = req.params.id;
    const userEmail = req.body.email;
    console.log("Requested user email is" + userEmail);
    const answer = await Answer.findById(answerId);

    if (!answer) {
      return res.status(404).json({ message: "answer not found" });
    }

    const hasUpvoted = answer.upvotes.find((email) => email === userEmail);

    if (hasUpvoted) {
      return res
        .status(400)
        .json({ message: "User has already upvoted this answer" });
    }

    answer.upvotes.push(userEmail);
    await answer.save();
    const totalUpvotes = answer.upvotes.length;
    console.log("Total Upvotes", totalUpvotes);
    const data = await Answer.findById(answerId);
    console.log(
      "----------------------------Printing Answer data------------------"
    );
    console.log(data);
    const answeruseremail = data.uemail;
    console.log("Answer is given by ", answeruseremail);
    const rewardcredit = totalUpvotes % 5;
    if (rewardcredit === 0) {
      console.log("----------Credits will be awarded to ", answeruseremail);
      const reqarddata = await Usermodel.findOne({ email: data.uemail });
      console.log("Printing user data");
      console.log(reqarddata);
      console.log("Printing credits");
      console.log(reqarddata.credits);
      const updatedcredits = reqarddata.credits + 2;
      console.log("Updated credits", updatedcredits);
      const secondupdatedata = await Usermodel.findOneAndUpdate(
        { email: answeruseremail },
        { credits: updatedcredits },
        { new: true }
      );
      console.log("Updated credits with data", secondupdatedata);
      const transactions = await Transaction.create({
        email: answeruseremail,
        transactiontype: "credits earned",
        details: "credits earned ",
        creditscount: 2,
        mode: "credit",
      });
      console.log("Updated transaction with data", transactions);
    } else {
      console.log("No credits will be awarded");
    }
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/totalupvotes/:id", async (req, res) => {
  try {
    const answerId = req.params.id;
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: "answer not found" });
    }

    const totalUpvotes = answer.upvotes.length;

    return res.status(200).json({ total: totalUpvotes });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/totalbyuser/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const totalquestion = await Question.countDocuments({ uemail: email });
    const totalanswer = await Answer.countDocuments({ uemail: email });
    const totalcomplaint = await Complaint.countDocuments({ email: email });

    res.json({
      stat: "ok",
      totalquestions: totalquestion,
      totalanswers: totalanswer,
      totalcomplaints: totalcomplaint,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ stat: "notok", message: err.message });
  }
});

// router.get("/vview/:id", async (req, res) => {
//   const id = req.params.id;
//   console.log("Answer" + id);
//   try {
//     const getAnswer = await Answer.findById(req.params.id);

//     res.json({ ans: getAnswer });
//   } catch (err) {
//     res.json({ status: "error", error: "Error Occured" });
//   }
// });
// router.post("/checkupvote/:id", async (req, res) => {
//   const answerId = req.params.id;
//   const email = req.body.email;
//   try {
//     const answer = await Answer.findById(answerId);
//     if (!answer) {
//       return res.status(404).json({ message: "Answer not found" });
//     }
//     let isUpvoted = false;
//     for (let i = 0; i < answer.upvotes.length; i++) {
//       if (answer.upvotes[i] === email) {
//         isUpvoted = true;
//         break;
//       }
//     }
//     if (!isUpvoted) {
//       return res
//         .status(200)
//         .json({ message: "not upvoted", upvoters: answer.upvotes });
//     } else {
//       return res.status(409).json({
//         message: "upvoted",
//         upvoters: answer.upvotes,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// router.post("/upvote/:id", async (req, res) => {
//   const answerId = ObjectId(req.params.id);

//   const email = req.body.email;
//   try {
//     const answer = await Answer.findById(answerId);
//     if (!answer) {
//       return res.status(404).json({ message: "Answer not found" });
//     }
//     let isUpvoted = false;
//     for (let i = 0; i < answer.upvotes.length; i++) {
//       if (answer.upvotes[i] === email) {
//         isUpvoted = true;
//         break;
//       }
//     }
//     if (!isUpvoted) {
//       answer.upvotes.push(email);
//       await answer.save();
//       return res
//         .status(200)
//         .json({ message: "Answer upvoted", upvoters: answer.upvotes });
//     } else {
//       return res
//         .status(409)
//         .json({ message: "Answer already upvoted", upvoters: answer.upvotes });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

//get specific questions answered by user
router.get("/answeredby/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find all answer documents with the given email

    const answers = await Answer.find({ uid: id });

    // Get an array of answer IDs from the answers found
    const answerIds = answers.map((answer) => answer._id);

    // Find all question documents with any of the answer IDs found
    const questions = await Question.find({ answers: { $in: answerIds } });

    // Send the resulting array of questions as a response
    res.status(200).json({ status: "ok", questions: questions });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/answeredby-mostrecent/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find all answer documents with the given email

    const answers = await Answer.find({ uid: id });

    // Get an array of answer IDs from the answers found
    const answerIds = answers.map((answer) => answer._id);

    // Find all question documents with any of the answer IDs found
    const questions = await Question.find({ answers: { $in: answerIds } }).sort(
      {
        createdAt: -1,
      }
    );

    // Send the resulting array of questions as a response
    res.status(200).json({ status: "ok", questions: questions });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/answeredby-mostviewed/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find all answer documents with the given email

    const answers = await Answer.find({ uid: id });

    // Get an array of answer IDs from the answers found
    const answerIds = answers.map((answer) => answer._id);

    // Find all question documents with any of the answer IDs found
    const questions = await Question.find({ answers: { $in: answerIds } }).sort(
      {
        totalviews: -1,
      }
    );

    // Send the resulting array of questions as a response
    res.status(200).json({ status: "ok", questions: questions });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const answer = await Answer.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res.json({ status: "updated", answer: answer });
  } catch (err) {
    console.log(err.message);
    res.send({ message: err.message });
  }
});
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log("REuested id is " + id);
  try {
    const answer = await Answer.findById(id);

    // Delete the answer document
    await answer.remove();

    // Remove the answer ID from the array of answers in the corresponding question document
    await Question.updateMany({ answers: id }, { $pull: { answers: id } });

    res.json({ status: "deleted" });
  } catch (err) {
    console.log(err.message);
    res.json({ status: "error", error: err.message });
  }
});

module.exports = router;
