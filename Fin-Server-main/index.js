// MERN = Mongo + Express + React + Node

// Development = Node.js server + React server

// MEN

// E - Express

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AuthRouter = require("./routes/authrouter");
const QuestionRouter = require("./routes/question");
const AnswerRouter = require("./routes/answers");
const ComplaintsRouter = require("./routes/complaints");
const TransactionRouter = require("./routes/transactions");
const PayoutRouter = require("./routes/payout");
const AssignCreditsRouter = require("./routes/assigncredits");
const WithdrawAmountRouter = require("./routes/withdraw");
const Charts = require("./routes/charts");
const Pricingrouter = require("./routes/Pricingplan");
const Redeem = require("./routes/Redeem");
const feedbackrouter = require("./routes/feedback");
const InterestRouter = require("./routes/interestrecord");
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/testlearnx");
// mongoose.connect("mongodb://localhost:27017/learnx");
app.use("/api", AuthRouter);
app.use("/questions", QuestionRouter);
app.use("/answers", AnswerRouter);
app.use("/complaints", ComplaintsRouter);
app.use("/interests", InterestRouter);
app.use("/transactions", TransactionRouter);
app.use("/payout", PayoutRouter);
app.use("/credits", AssignCreditsRouter);
app.use("/withdraw", WithdrawAmountRouter);
app.use("/charts", Charts);
app.use("/pricingplan", Pricingrouter);
app.use("/redeem", Redeem);
app.use("/feedback", feedbackrouter);

// app.get("/api/quote", async (req, res) => {
//   const token = req.headers["x-access-token"];

//   try {
//     const decoded = jwt.verify(token, "secret123");
//     const email = decoded.email;
//     const user = await User.findOne({ email: email });

//     return res.json({ status: "ok", quote: user.quote });
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "error", error: "invalid token" });
//   }
// });

// app.post("/api/quote", async (req, res) => {
//   const token = req.headers["x-access-token"];

//   try {
//     const decoded = jwt.verify(token, "secret123");
//     const email = decoded.email;
//     await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

//     return res.json({ status: "ok" });
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "error", error: "invalid token" });
//   }
// });

app.listen(1337, () => {
  console.log("Server started on 1337");
});
