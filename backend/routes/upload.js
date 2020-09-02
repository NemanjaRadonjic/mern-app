const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { uploadAvatar } = require("../controllers/upload");
const { decode } = require("jsonwebtoken");

const { authenticateAccessToken } = require("../jwt");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile");
  },
  filename: function (req, file, cb) {
    // const ext = file.mimetype.split("/")[1];
    // console.log(ext);
    // const accessToken = req.headers.authorization.split(" ")[1];
    // const userData = decode(accessToken);
    cb(null, `${Date.now()}-${uuidv4()}-${file.originalname}`);
    // cb(null, `${userData.id}.${ext}`);
  },
});

var upload = multer({ storage });

router.post(
  "/profile",
  authenticateAccessToken,
  upload.single("image"),
  uploadAvatar
);

module.exports = router;
