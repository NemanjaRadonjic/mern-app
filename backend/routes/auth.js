const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/register/validate", async (req, res) => {
  const { username, email, fieldName } = req.body;

  if (fieldName === "username") {
    try {
      const matchedUser = await User.find({ username });
      if (matchedUser.length !== 0) {
        return res.json({
          field: "username",
          message: "Username already exists",
        });
      }
    } catch (error) {
      return res.json({ success: false, message: "Something went wrong." });
    }
  }

  // check if email already exists
  try {
    const matchedUser = await User.find({ email });
    if (matchedUser.length !== 0) {
      return res.json({ field: "email", message: "Email already exists" });
    }
  } catch (error) {
    return res.json({ success: false, message: "Something went wrong." });
  }
  return res.json({ message: "no errors found" });
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // check if username already exists
  const user = new User({ username, email, password });

  let errors = {
    username: "",
    email: "",
  };

  try {
    const matchedUser = await User.find({ username });
    if (matchedUser.length !== 0) {
      errors.username = "Username already exists";
      return res.status(422);
    }
  } catch (error) {
    res.json({ success: false, message: "Something went wrong." });
  }

  // check if email already exists
  try {
    const matchedUser = await User.find({ email });
    if (matchedUser.length !== 0) {
      errors.email = "Email already exists";
      return res.status(422);
    }
  } catch (error) {
    res.json({ success: false, message: "Something went wrong." });
  }

  if (errors.username || errors.email) {
    res.json({ ...errors });
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
