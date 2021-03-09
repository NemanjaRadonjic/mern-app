const express = require("express");
const router = express.Router();

const UserControllers = require("../controllers/users");

router.route("/").get(UserControllers.fetchUsers);

router.route("/:username").get(UserControllers.fetchUser);

router.route("/:username/images").get(UserControllers.fetchUserImages);

router.route("/:username/posts").get(UserControllers.fetchUserPosts);

router.route("/:username/posts/liked").get(UserControllers.fetchLikedUserPosts);

router
  .route("/:username/posts/disliked")
  .get(UserControllers.fetchDislikedUserPosts);

router
  .route("/:username/settings/username")
  .patch(UserControllers.changeUsername);

router.route("/:username/settings/email").patch(UserControllers.changeEmail);

router
  .route("/:username/settings/password")
  .patch(UserControllers.changePassword);

router.route("/:username/delete").delete(UserControllers.deleteUser);

module.exports = router;
