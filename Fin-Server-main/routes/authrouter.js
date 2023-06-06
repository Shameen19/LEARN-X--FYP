const express = require("express");

const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body);
  console.log(req.body.selected);

  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    try {
      const newPassword = await bcrypt.hash(req.body.password, 10);
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: newPassword,
        // $push: { skills: { $each: req.body.selected } },
        skills: req.body.selected,
        role: req.body.role,
      });
      res.json({ status: "ok" });
    } catch (err) {
      res.json({ status: "error", error: err.message });
    }
  } else {
    res.json({ status: "error", error: "Email Already Exists" });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.json({
      status: "No Account with This Email Found",
      error: "Invalid login",
    });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        role: user.role,
        userid: user._id,
      },
      "secret123"
    );
    console.log("passowrd validated");
    return res.json({ status: "ok", user: token, picu: user.picurl });
  } else {
    console.log("passowrd not validated");
    return res.json({ status: "Invalid Password", user: false });
  }
});

router.get("/mentors", async (req, res) => {
  try {
    const mentors = await User.find({ role: "mentor" });

    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/updaterole/", async (req, res) => {
  const { useremail, userrole } = req.body;
  console.log("email" + useremail + " role" + userrole);

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: useremail }, // Find the user by its ID
      { $set: { role: userrole } }, // Update the role field with the new value
      { new: true } // Return the updated user document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      status: "ok",
      message: "User role updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.post("/resetpassword", async (req, res) => {
//   const user = await User.findOne({
//     email: req.body.email,
//   });

//   if (!user) {
//     return res.json({
//       status: "No Account with This Email Found",
//       error: "Invalid login",
//     });
//   } else {
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "lightlime145@gmail.com",
//         pass: "dhatpdlmuhhlnuzp",
//       },
//     });

//     var content = "Your Password is: " + user.password;
//     var mailOptions = {
//       from: "lightlime145@gmail.com",
//       to: "shoaibqadeer0342@gmail.com",
//       subject: "New Email using Nodejs",
//       text: content,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     });
//   }
// });

// Route to request a password reset
router.post("/reset-password", async (req, res) => {
  console.log("reset password");
  try {
    // Find the user with the matching email address
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Generate a JWT with the user's ID as the subject and a unique reset token as the payload
    // const resetToken = generateResetToken();
    const jwtPayload = {
      sub: user._id,
      email: user.email,
    };
    const jwtOptions = { expiresIn: "1h" };
    const token = jwt.sign(jwtPayload, "secret123", jwtOptions);

    // Save the reset token to the user's record
    user.resetToken = token;
    await user.save();

    // sendResetEmail(user.email, resetUrl);
    sendResetPasswordEmail(user.email, user._id, token);
    console.log("Email Sent");
    res.status(200).send({ message: "Password reset requested" });
  } catch (error) {
    console.log("error occured");
    res.status(500).send({ error: "Error requesting password reset" });
    console.log(error);
  }
});

// Route to handle the password reset form submission
router.post("/reset/:token", async (req, res) => {
  try {
    // Verify the JWT
    console.log(req.params.token);
    const jwtPayload = jwt.verify(req.params.token, "secret123");

    console.log("reset token: ", req.params.token);
    console.log("email", jwtPayload.email);
    // Find the user with the matching reset token
    const user = await User.findOne({
      email: jwtPayload.email,
      resetToken: req.params.token,
    });
    if (!user) {
      return res.status(401).send({ error: "Invalid reset token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();

    res.send({ message: "Password reset successful" });
  } catch (error) {
    res.status(401).send({ error: "Invalid reset token" });
  }
});

async function sendResetPasswordEmail(email, userId, rtoken) {
  // Create a JWT that expires in one hour
  const token = jwt.sign({ userId }, "secret123", {
    expiresIn: "1h",
  });

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
    html: `<p>Click the link to reset your password:</p>
           <p><a href="http://localhost:3000/auth/reset/${rtoken}">http://localhost:3000/auth/reset/${token}</a></p>`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

router.post("/update-password", async (req, res) => {
  var cur_pass = req.params.current_pass;
  var new_pass = req.params.new_pass;
  var uemail = req.params.email;
  console.log(req.body.email);
  console.log("The Pass" + req.body.current_pass);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }
  console.log(user);
  console.log(user.password);
  console.log(req.body.current_pass);
  const isPasswordValid = await bcrypt.compare(
    req.body.current_pass,
    user.password
  );

  if (isPasswordValid) {
    return res.json({ status: "Valid Password", user: true });
  } else {
    return res.json({ status: "Invalid Password", user: false });
  }
});

// router.post("/update-image", async (req, res) => {
//   const { email, image } = req.body;

//   try {
//     const update = await User.findOneAndUpdate(
//       { email: email },
//       { image: image },
//       { new: true }
//     );
//   } catch (err) {
//     res.json({ status: "Error", error: err.message });
//   }
// });

router.post("/update-profile", async (req, res) => {
  console.log("MSMEK");
  console.log("Updated Profile" + req.body);
  try {
    const awss = await User.findOneAndUpdate(
      { email: req.body.uemail },
      {
        $set: {
          name: req.body.uname,
          skills: req.body.uskills,
          interest: req.body.uinterests,
        },
      },
      { new: true }
    );

    if (!awss) {
      return res.status(404).send({ error: "User not found" });
    } else {
      res.json({ status: "Success", user: awss });
    }
  } catch (err) {
    res.json({ status: "Error", error: err.message });
  }
});

router.post("/update-image", async (req, res) => {
  console.log("MSMEK");
  console.log("Updated Profile" + req.body.uemail);
  try {
    const awss = await User.findOneAndUpdate(
      { email: req.body.uemail },
      {
        $set: {
          picurl: req.body.picurl,
        },
      },
      { new: true }
    );

    if (!awss) {
      return res.status(404).send({ error: "User not found" });
    } else {
      res.json({ status: "success", user: awss });
    }
  } catch (err) {
    res.json({ status: "Error", error: err.message });
  }
});

router.post("/get-profile", async (req, res) => {
  console.log("MSMEK");

  try {
    const awss = await User.find({ email: req.body.uemail });

    console.log("User Name " + awss);

    if (!awss) {
      return res.status(404).send({ error: "User not found" });
    } else {
      res.json({ status: "Success", user: awss });
    }
  } catch (err) {
    res.json({ status: "Error", error: err.message });
  }
});

router.get("/top5skills", async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$skills",
          count: { $sum: 1 },
        },
      },
      { $unwind: "$_id" },
      { $sortByCount: "$_id" },
      { $limit: 3 },
    ];

    const result = await User.aggregate(pipeline);
    const topSkills = result.map((item) => item._id);

    res.json({ topSkills });
  } catch (error) {
    console.error("Error fetching top skills:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/search-mentors", async (req, res) => {
  try {
    const { searchquery } = req.body;

    const mentors = await User.find({
      role: "mentor",
      skills: { $in: searchquery },
    });

    res.json({ searchedmentors: mentors, status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error at searching mentors" });
  }
});

module.exports = router;
