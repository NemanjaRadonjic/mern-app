const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;

  // check if passwords match
  if (password !== repeatPassword) {
    return res.json({
      success: false,
      message: "Password don't match",
    });
  }

  // check if username already exists
  const user = new User({ username, email, password });

  try {
    const matchedUser = await User.find({ username });
    if (matchedUser.length !== 0) {
      return res.json({
        success: false,
        message: "Username already exists",
      });
    }
  } catch (error) {
    res.json({ success: false, message: "Something went wrong." });
  }

  // check if email already exists
  try {
    const matchedUser = await User.find({ email });
    if (matchedUser.length !== 0) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }
  } catch (error) {
    res.json({ success: false, message: "Something went wrong." });
  }

  // saving user in mongodb
  try {
    await user.save();
    res.json({
      success: true,
    });
  } catch (error) {
    return res.json({ message: "Something went wrong.", success: false });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let matchedUser;
  try {
    matchedUser = await User.find({ email });
    if (matchedUser.length === 0) {
      return res.status(422).json({
        field: "email",
        message: "No account under that email.",
      });
    }
    if (password !== matchedUser[0].password) {
      return res.status(422).json({
        field: "password",
        message: "Password is not correct.",
      });
    }
  } catch (error) {
    return res.json({ message: "Something went wrong." });
  }
  return res.json({
    user: { username: matchedUser[0].username, email },
  });
});

module.exports = router;
