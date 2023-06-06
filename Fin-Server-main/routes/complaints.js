const express = require("express");

const Complaint = require("../models/complaints.js");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    await Complaint.create({
      name: req.body.name,
      location: req.body.location,
      email: req.body.email,
      subject: req.body.subject,
      details: req.body.details,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err.message);
    res.send({ message: err.message });
  }
});

router.get("/total/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const totalcomplaints = await Complaint.countDocuments({ email: email });

    res.json({
      stat: "ok",
      totalcomplaints: totalcomplaints,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ stat: "notok", message: err.message });
  }
});

//Viewing the user data
router.get("/viewdata/:uemail", async (req, res) => {
  // const email = req.params.uemail;
  // try {
  //   const complaintdata = await ComplaintSchema.find({ email: email });
  //   res.status(201).json(complaintdata);
  //   console.log(complaintdata);
  // } catch (error) {
  //   res.status(422).json(error);
  //   console.log("error");
  // }
  try {
    const email = req.params.uemail;
    const complaints = await Complaint.find({ email: email });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
});

//viewing the data by individual user id
router.get("/viewdata/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const complaint_id = await ComplaintSchema.findById({ _id: id });
    console.log(complaint_id);
    res.status(201).json(complaint_id);
  } catch (error) {
    console.log(error);
    res.status(422).json(error);
  }
});

//updating a record
router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateuser = await ComplaintSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updateuser);
    res.status(201).json(updateuser);
  } catch (error) {
    console.log("Error detected");
    res.status(422).json("Error");
  }
});

//Deleting a complaint

router.delete("/deleterecord/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteuser = await ComplaintSchema.findByIdAndDelete({ _id: id });
    console.log("Data deleted");
    res.status(201).json(deleteuser);
  } catch (error) {
    console.log("error");
    res.status(422).json("Error reported");
  }
});

module.exports = router;
