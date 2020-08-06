const express = require("express");
const router = express.Router();

const UserControllers = require("../controllers/users");

router.route("/register/validate").post(UserControllers.validate); // validate onBlur

router.route("/register").post(UserControllers.register);

router.route("/login").post(UserControllers.login);

module.exports = router;
