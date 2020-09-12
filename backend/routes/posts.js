const express = require("express");
const router = express.Router();
const { authenticateAccessToken } = require("../jwt");

const PostControllers = require("../controllers/posts");

router.route("/").get(PostControllers.fetchPosts);

router
  .route("/create")
  .post(authenticateAccessToken, PostControllers.createPost);

router.route("/:postId").get(PostControllers.fetchPost);

router
  .route("/:postId/comment")
  .post(authenticateAccessToken, PostControllers.createComment);

router.route("/:postId/comments").get(PostControllers.fetchComments);

router
  .route("/:postId/vote")
  .post(authenticateAccessToken, PostControllers.vote);

module.exports = router;
