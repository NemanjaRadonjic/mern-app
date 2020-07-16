const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;
  const user = new User({ username, email, password });
  try {
    await user.save();
    return res.json({ success: true });
  } catch (error) {
    res.json({ message: "Something went wrong.", success: false });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  res.json({ currentUser: { email, password } });
});

module.exports = router;
