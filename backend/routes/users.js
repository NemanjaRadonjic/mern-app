const express = require("express");
const router = express.Router();

const UserControllers = require("../controllers/users");

router.route("/:username").get(UserControllers.fetchUser);

router.route("/:username/images").get(UserControllers.fetchUserImages);

router.route("/:username/posts").get(UserControllers.fetchUserPosts);

router.route("/:username/posts/liked").get(UserControllers.fetchLikedUserPosts);

router
  .route("/:username/posts/disliked")
  .get(UserControllers.fetchDislikedUserPosts);

module.exports = router;
