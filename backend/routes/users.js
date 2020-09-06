const express = require("express");
const router = express.Router();

const UserControllers = require("../controllers/users");

router.route("/:username").get(UserControllers.fetchUser);

router.route("/:username/posts").get(UserControllers.fetchUserPosts);

module.exports = router;
