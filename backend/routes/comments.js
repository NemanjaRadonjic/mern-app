const express = require("express");
const router = express.Router();
const { authenticateAccessToken } = require("../jwt");

const CommentControllers = require("../controllers/comments");

router
  .route("/:commentId/like")
  .post(authenticateAccessToken, CommentControllers.like);

router
  .route("/:commentId/dislike")
  .post(authenticateAccessToken, CommentControllers.dislike);

module.exports = router;
