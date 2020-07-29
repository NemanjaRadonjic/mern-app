const express = require("express");
const router = express.Router();

const PostControllers = require("../controllers/posts");

router.route("/").get(PostControllers.fetchPosts);

router.route("/create").post(PostControllers.createPost);

module.exports = router;
