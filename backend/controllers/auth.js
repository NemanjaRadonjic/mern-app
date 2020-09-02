const User = require("../models/User");
const { validateRegister } = require("../helpers/validate");
const { verify } = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../jwt");

const login = async (req, res) => {
  const { email, password } = req.body;
  let matchedUser;
  try {
    matchedUser = await User.findOne({ email });
    if (!matchedUser) {
      return res.status(422).json({
        field: "email",
        message: "No account under that email.",
      });
    }
    if (password !== matchedUser.password) {
      return res.status(422).json({
        field: "password",
        message: "Password is not correct.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
  const { id, username, avatar } = matchedUser;
  const userData = {
    username,
    email,
    id,
  };
  const accessToken = generateAccessToken(userData);
  const refreshToken = generateRefreshToken(userData);
  res.cookie("token", refreshToken);
  return res.json({ accessToken, avatar });
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const user = new User({ username, email, password });

  let errors = validateRegister(req.body);

  // validate username
  try {
    const matchedUser = await User.findOne({ username });
    if (matchedUser) {
      errors.username = "Username already exists";
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }

  // validate email
  try {
    const matchedUser = await User.findOne({ email });
    if (matchedUser) {
      errors.email = "Email already exists";
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }

  if (
    errors.username ||
    errors.email ||
    errors.password ||
    errors.repeatPassword
  ) {
    return res.json(errors);
  } else {
    user.avatar = "uploads/profile/AvatarDefault.jpg";
    try {
      await user.save();
      return res.status(201).send();
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
};

const validate = async (req, res) => {
  const { username, email, fieldName } = req.body;

  if (fieldName === "username") {
    try {
      const matchedUser = await User.findOne({ username });
      if (matchedUser) {
        return res.json({
          field: "username",
          message: "Username already exists",
        });
      }
      return res.send();
    } catch (error) {
      return res.status(500).send();
    }
  }

  // check if email already exists
  try {
    const matchedUser = await User.findOne({ email });
    if (matchedUser) {
      return res.json({ field: "email", message: "Email already exists" });
    }
    return res.send();
  } catch (error) {
    return res.status(422).send();
  }
};

const fetchUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findById(userId);
  } catch (error) {
    return res.status(404).json();
  }
  return res.status(200).json();
};

const refreshToken = async (req, res) => {
  const { token } = req.cookies;
  const { userData } = req.body;
  if (!token) {
    return res.json({ accessToken: "" });
  }
  verify(token, process.env.REFRESH_TOKEN_SECRET, (err) => {
    if (err && err.expiredAt) {
      return res.status(403).json({ accessToken: "" });
    }
    const accessToken = generateAccessToken(userData);
    const refreshToken = generateRefreshToken(userData);
    res.cookie("token", refreshToken);
    return res.json({ accessToken });
  });
};

module.exports = { login, register, validate, fetchUser, refreshToken };
