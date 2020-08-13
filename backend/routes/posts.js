const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware");

const PostControllers = require("../controllers/posts");

router.route("/").get(PostControllers.fetchPosts);

router
  .route("/user/:userId")
  .get(authenticateToken, PostControllers.fetchPostsById);

router.route("/:postId").get(PostControllers.fetchPost);

router.route("/create").post(authenticateToken, PostControllers.createPost);

router.route("/:postId/vote").post(authenticateToken, PostControllers.vote);

module.exports = router;
