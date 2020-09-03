const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { uploadImage } = require("../controllers/upload");

const { authenticateAccessToken } = require("../jwt");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${uuidv4()}-${file.originalname}`);
  },
});

var upload = multer({ storage });

router.post("/", authenticateAccessToken, upload.single("image"), uploadImage);

module.exports = router;
