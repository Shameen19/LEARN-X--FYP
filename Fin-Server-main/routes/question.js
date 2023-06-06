const express = require("express");

const mongoose = require("mongoose");
const Question = require("../models/questions.model.js");
const User = require("../models/user.model.js");
const Reports = require("../models/reports.model.js");
const Answer = require("../models/answer.model.js");
const Transaction = require("../models/transactions.js");
//const Celebrity = require('../models/celebrity.model.js');

const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/addnew", async (req, res) => {
  try {
    // const token = req.headers["x-access-token"];
    // const decoded = jwt.verify(token, "secret123");
    console.log("tags received are" + req.body.selected);

    console.log(req.body);
    const email = req.body.uemail;
    console.log(email);
    const data = await User.findOne({ email });
    console.log("Printing user data");
    console.log(data);
    const check = data.credits;
    console.log("Checking credits");
    console.log(check);
    //   const email = decoded.email;
    //post question credits logic here
    if (check > 1) {
      const deductedcredits = data.credits - 2;
      const data2 = await User.findOneAndUpdate(
        { email },
        { credits: deductedcredits },
        { new: true }
      );
      const transitionaddition = await Transaction.create({
        email: email,
        transactiontype: "credits used",
        details: "question asked",
        creditscount: 2,
        mode: "debit",
      });
      console.log("Updated user data");
      console.log(data2);
      console.log("updated transition data");
      console.log(transitionaddition);
      await Question.create({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.selected,
        uemail: req.body.uemail,
      });
      res.json({ status: "ok" });
    } else if (check <= 1) {
      console.log("Insufficent");
      res.json({ status: "insufficent" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Error Occured" });
  }
});

router.post("/getinterest", async (req, res) => {
  const questions = req.body.questions;

  try {
    const data = await Question.find({ _id: { $in: questions } });

    res.json({ status: "ok", questions: data });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

router.get("/chartsdata", async (req, res) => {
  // Replace with your logic to fetch user questions data from the database
  const totalQuestionsAsked = 10;
  const totalQuestionsAnswered = 5;

  // Construct the response object
  const response = {
    totalQuestionsAsked,
    totalQuestionsAnswered,
  };

  res.json(response);
});

router.post("/skillbased", async (req, res) => {
  try {
    const tags = req.query.tags || []; // Assuming tags are passed as query parameters in the request

    // Find the top 10 questions based on tags, sorted by total views and createdAt
    const topQuestions = await Question.find({ tags: { $in: tags } })
      .sort({ totalviews: -1, createdAt: -1 })
      .limit(10);

    res.json(topQuestions);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Assuming the necessary modules and models have been imported

// Route for getting line chart data for user's asked questions
router.get("/user-question-views/:email", async (req, res) => {
  const useremail = req.params.email; // Assuming user ID is stored in the req object
  console.log("Reqest for views email:" + useremail);
  try {
    // Get all questions asked by the user
    const questions = await Question.find({ uemail: useremail });

    // Map question IDs to an array
    const questionIds = questions.map((q) => q._id);

    // Get the view count for each question over time
    const questionViews = await Question.aggregate([
      {
        $match: {
          questionId: { $in: questionIds },
        },
      },
      {
        $group: {
          _id: {
            questionId: "$questionId",
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Format the data for chart.js
    const chartData = {
      labels: [],
      datasets: [
        {
          label: "Question Views",
          data: [],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    // Map the aggregated data to chart.js format
    questionViews.forEach((view) => {
      const date = `${view._id.day}/${view._id.month}/${view._id.year}`;
      chartData.labels.push(date);
      chartData.datasets[0].data.push(view.count);
    });

    res.json(chartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const ITEMS_PER_PAGE = 5;

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });

    res.json({ status: "ok", questions: questions });
  } catch (err) {
    res.json({ status: "error", error: "Error Occured" });
  }
});

// router.get("/all", async (req, res) => {
//   const { page, recency, viewsort } = req.query;
//   console.log(
//     "Page nn is " + page + " recency is " + recency + " viewsort is " + viewsort
//   );

//   try {
//     const skip = (page - 1) * ITEMS_PER_PAGE;
//     const count = await Question.find().countDocuments();
//     const questions = await Question.find()
//       .limit(ITEMS_PER_PAGE)
//       .skip(skip)
//       .sort({ createdAt: -1 });

//     const pageCount = count / ITEMS_PER_PAGE;

//     res.json({
//       status: "ok",
//       questions: questions,
//       pagination: { count, pageCount },
//     });
//   } catch (err) {
//     res.json({ status: "error", error: "Error Occured" });
//   }
// });

router.get("/getusername/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    res.json({ status: "ok", user: user });
  } catch (err) {
    res.json({ status: "error", error: "Error Occured" });
  }
});

router.get("/se/", async (req, res) => {
  const { query, page } = req.query;
  console.log("Page" + page + " query is " + query);

  try {
    const regex = new RegExp(query, "i");
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const count = await Question.find({
      $or: [{ title: regex }, { tags: regex }],
    }).countDocuments();
    const questions = await Question.find({
      $or: [{ title: regex }, { tags: regex }],
    })
      .limit(ITEMS_PER_PAGE)
      .skip(skip)
      .sort({ totalviews: -1 });
    const pageCount = count / ITEMS_PER_PAGE;

    // res.status(200).json({ status: "ok", questions: questions });
    res.json({
      status: "ok",
      questions: questions,
      pagination: { count, pageCount },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", async (req, res) => {
  const { page, recency, viewsort } = req.query;
  console.log(
    "Page nn is " + page + " recency is " + recency + " viewsort is " + viewsort
  );

  try {
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const count = await Question.find().countDocuments();
    // const questions = await Question.find()
    //   .limit(ITEMS_PER_PAGE)
    //   .skip(skip)
    //   .sort({ createdAt: -1 });
    const sortOptions = {};

    if (viewsort === "-1") {
      const questions = await Question.find()
        .limit(ITEMS_PER_PAGE)
        .skip(skip)
        .sort({ totalviews: -1 });
      const pageCount = count / ITEMS_PER_PAGE;

      res.json({
        status: "ok",
        questions: questions,
        pagination: { count, pageCount },
      });
    } else {
      const questions = await Question.find()
        .limit(ITEMS_PER_PAGE)
        .skip(skip)
        .sort({ createdAt: -1 });
      const pageCount = count / ITEMS_PER_PAGE;
      res.json({
        status: "ok",
        questions: questions,
        pagination: { count, pageCount },
      });
    }

    // const questions = await Question.find()
    //   .limit(ITEMS_PER_PAGE)
    //   .skip(skip)
    //   .sort({ totalviews: -1 });
    // const pageCount = count / ITEMS_PER_PAGE;

    // res.json({
    //   status: "ok",
    //   questions: questions,
    //   pagination: { count, pageCount },
    // });
  } catch (err) {
    console.log(err.message);
    res.json({ status: "error", error: "Error Occured" });
  }
});

router.get("/allquestions", (req, res) => {
  // Extract the values of page, recency, and viewsort from the query parameters
  const { page, recency, viewsort } = req.query;

  // Perform any necessary operations using these values
  // For example, you can access them as variables to use in your logic or queries

  // Send a response with the extracted values
  res.json({
    page: page,
    recency: recency,
    viewsort: viewsort,
  });
});
router.get("/most-recent", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });

    res.json({ status: "ok", questions: questions });
  } catch (err) {
    res.json({ status: "error", error: "Error Occured" });
  }
});

router.get("/most-viewed", async (req, res) => {
  try {
    const questions = await Question.find().sort({ totalviews: -1 });

    res.json({ status: "ok", questions: questions });
  } catch (err) {
    res.json({ status: "error", error: "Error Occured" });
  }
});

router.get("/most-answered", async (req, res) => {
  try {
    const questions = await Question.aggregate([
      { $match: { answers: { $exists: true } } },
      {
        $project: {
          title: 1,
          description: 1,
          tags: 1,
          upvotes: 1,
          createdAt: 1,
          totalviews: 1,
          answersCount: { $size: "$answers" },
        },
      },
      { $sort: { answersCount: -1 } },
    ]);
    res.json({ status: "ok", questions: questions });
  } catch (err) {
    res.json({ status: "error", error: "Error Occured" });
  }
});

router.get("/personal/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const getQuestion = await Question.find({ uemail: email }).sort({
      createdAt: -1,
    });

    res.json({ status: "ok", questions: getQuestion });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

router.get("/personalmostrecent/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const getQuestion = await Question.find({ uemail: email }).sort({
      createdAt: -1,
    });

    res.json({ status: "ok", questions: getQuestion });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

router.get("/personalmostviewed/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const getQuestion = await Question.find({ uemail: email }).sort({
      totalviews: -1,
    });

    res.json({ status: "ok", questions: getQuestion });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

router.get("/recentquestions", async (req, res) => {
  try {
    const getQuestion = await Question.find().sort({ createdAt: -1 }).limit(5);
    res.json({ status: "ok", quest: getQuestion });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

router.get("/view/:id", async (req, res) => {
  const id = req.params.id;
  console.log("REuested id is " + id);

  try {
    await Question.findByIdAndUpdate(req.params.id, {
      $inc: { totalviews: 1 },
    });

    const getQuestion = await Question.findById(req.params.id).populate(
      "answers"
    );

    console.log(getQuestion);
    const answ = await getQuestion.answers;
    const emai = getQuestion.uemail;
    const uname = await User.findOne({ email: emai });

    const use = uname.name;

    res.json({
      status: "ok",
      question: getQuestion,
      answers: answ,
      usname: use,
    });
  } catch (err) {
    console.log(err.message);
    res.json({ status: "error", error: "Error Occured" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log("REuested id is " + id);
  try {
    const delQuestion = await Question.deleteOne({ _id: req.params.id });
    res.json({ status: "deleted" });
  } catch (err) {
    console.log(err.message);
    res.json({ status: "error", error: "Error Occured" });
  }
});

router.get("/tags/top", async (req, res) => {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
  try {
    const tags = await Question.aggregate([
      { $match: { createdAt: { $gte: weekAgo } } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]);
    res.status(200).json({ stat: "ok", toptags: tags });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/randquestion", async (req, res) => {
  try {
    // Calculate the start and end date of the current week
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const startDate = new Date(
      currentDate.setDate(currentDate.getDate() - currentDay)
    );
    const endDate = new Date(currentDate.setDate(currentDate.getDate() + 6));

    // Find the questions with the highest totalviews within the specified week
    const topQuestions = await Question.find({
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .sort({ totalviews: -1 })
      .limit(4);

    res.json({ topQuestions });
  } catch (error) {
    console.error("Error fetching top viewed questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

// router.get("/relatedquestions/:id", async (req, res) => {
//   try {
//     // Find the question by ID
//     const question = await Question.findById(req.params.id);

//     // If the question doesn't exist, return a 404 error
//     if (!question) {
//       return res.status(404).send("Question not found");
//     }

//     // Find related questions by title and tags
//     const relatedQuestions = await Question.find({
//       $or: [{ title: question.title }, { tags: { $in: question.tags } }],
//       _id: { $ne: question._id },
//     })
//       .sort({ createdAt: -1 })
//       .limit(5);

//     // Return the question and related questions
//     res.json({ status: "ok", ques: relatedQuestions });
//   } catch (err) {
//     console.error(err);
//     res.json({ status: "error", error: err.message });
//   }
// });

router.post("/relatedquestions/", async (req, res) => {
  const questionsids = req.body.questionsids;
  console.log(questionsids);

  try {
    // Find the question by ID
    const ids = questionsids.map((id) => mongoose.Types.ObjectId(id));
    const question = await Question.find({ _id: { $in: ids } });

    // If the question doesn't exist, return a 404 error
    if (!question) {
      return res.status(404).send("Question not found");
    }

    // Find related questions by title and tags
    // const relatedQuestions = await Question.find({
    //   $or: [{ title: question.title }, { tags: { $in: question.tags } }],
    //   _id: { $ne: question._id },
    // })
    //   .sort({ createdAt: -1 })
    //   .limit(5);

    // Return the question and related questions
    res.json({ status: "ok", ques: question });
  } catch (err) {
    console.error(err);
    res.json({ status: "error", error: err.message });
  }
});
router.put("/edit", async (req, res) => {
  console.log("Request for edit is received for " + req.body.id);
  try {
    const updateQuestion = await Question.updateOne(
      { _id: req.body.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          tags: req.body.selected,
        },
      }
    );
    res.json({ status: "ok", question: updateQuestion });
    // res.json({ status: "ok", question: updateQuestion });
  } catch (err) {
    console.log("Error Occured at " + err.message);
  }
});

router.get("/question-answer-count/:usermail", async (req, res) => {
  try {
    const { usermail } = req.params;

    // Get the number of questions the user has asked
    const questionCount = await Question.countDocuments({ uemail: usermail });

    // Get the number of questions the user has answered
    const answerCount = await Answer.countDocuments({ uemail: usermail });

    res.json({ tqs: questionCount, tans: answerCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/related-questions/:id", async (req, res) => {
  try {
    // Get the question ID from the URL parameter
    const { id } = req.params;

    // Find the question with the given ID
    const question = await Question.findById(id);

    // Get the tags of the question
    const tags = question.tags;

    // Find other questions with the same tags, sorted by total views
    const relatedQuestions = await Question.find({
      _id: { $ne: question._id },
      tags: { $in: tags },
    })
      .sort("-totalviews")
      .limit(5);

    // Return the related questions
    res.json(relatedQuestions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/report/", async (req, res) => {
  console.log(req.body);
  try {
    const report = await Reports.create({
      comments: req.body.reportcontent,
      questionId: req.body.quesid,
      aguseremail: req.body.reportedagainst,
      reportype: req.body.reportcategory,
      reportby: req.body.reportedby,
    });

    // await report.save();
    res.json({ status: "Reported", report: report });
  } catch (err) {
    console.log(err.message);
    res.json({ status: "NotReported", error: err.message });
  }
});

router.get("/getreports/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const reports = await Reports.find({ aguseremail: id });
    res.json({ status: "ok", reports: reports });
  } catch (err) {
    console.log(err);
    res.json({ status: "NotFound", error: err.message });
  }
});

module.exports = router;
