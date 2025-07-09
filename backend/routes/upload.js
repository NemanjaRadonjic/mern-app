const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { uploadImage } = require("../controllers/upload");
const { authenticateAccessToken } = require("../jwt");

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_uploads",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    public_id: (req, file) => `${Date.now()}-${uuidv4()}-${file.originalname}`,
  },
});

const upload = multer({ storage });

router.post("/", authenticateAccessToken, upload.single("image"), uploadImage);

module.exports = router;
