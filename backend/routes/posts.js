const express = require("express");
const router = express.Router();

const PostControllers = require("../controllers/posts");

router.route("/").get(PostControllers.fetchPosts);

router.route("/:userId").get(PostControllers.fetchPostsById);

router.route("/:postId").get(PostControllers.fetchPost);

router.route("/create").post(PostControllers.createPost);

router.route("/:postId/vote").post(PostControllers.vote);

module.exports = router;
