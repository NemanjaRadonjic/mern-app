const express = require("express");
const router = express.Router();
const { authenticateAccessToken } = require("../jwt");

const PostControllers = require("../controllers/posts");

router.route("/").get(PostControllers.fetchPosts);

router.route("/:postId").get(PostControllers.fetchPost);

router
  .route("/create")
  .post(authenticateAccessToken, PostControllers.createPost);

router
  .route("/:postId/vote")
  .post(authenticateAccessToken, PostControllers.vote);

module.exports = router;
