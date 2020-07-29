const User = require("../models/User");
const { validateRegister } = require("../helpers/validate");

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
  return res.json({
    user: { username: matchedUser.username, email },
  });
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

module.exports = { login, register, validate };
