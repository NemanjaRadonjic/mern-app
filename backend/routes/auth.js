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
    return res.json({
      success: true,
      message: "Welcome!",
    });
  } catch (error) {
    return res.json({ message: "Something went wrong.", success: false });
  }
});

// TODO: add a different route that fe will send requests to onBlur to check database and update the user immediately

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let matchedUser;

  try {
    matchedUser = await User.find({ email });
    if (matchedUser.length === 0) {
      return res.json({
        success: false,
        message: "No account under that email.",
      });
    }
    if (password !== matchedUser[0].password) {
      return res.json({
        success: false,
        message: "Password is not correct.",
      });
    }
  } catch (error) {
    res.json({ success: false, message: "Something went wrong." });
  }

  res.json({
    success: true,
    user: { username: matchedUser[0].username, email },
  });
});

module.exports = router;
