const express = require("express");
const router = express.Router();

const AuthControllers = require("../controllers/auth");

router.route("/refresh_token").post(AuthControllers.refreshToken);

router.route("/register").post(AuthControllers.register);

router.route("/register/validate").post(AuthControllers.validate); // validate onBlur

router.route("/login").post(AuthControllers.login);

router.route("/:userId").post(AuthControllers.fetchUser);

module.exports = router;
