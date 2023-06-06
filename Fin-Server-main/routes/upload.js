const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Set up multer middleware for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Handle file uploads
router.post("/upload", upload.single("file"), (req, res) => {
  console.log("Request ---", req.body);
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const fileUrl = `http://localhost:1337/${req.file.path}`;

  res.json({ url: fileUrl });
});

module.exports = router;
