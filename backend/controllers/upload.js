const User = require("../models/User");
const { decode } = require("jsonwebtoken");

const uploadImage = async (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  const { type } = req.body;
  const { path } = req.file;
  const { id } = decode(accessToken);

  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }

  user[type] = path;
  user[`${type}s`].push(path);

  try {
    await user.save();
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }

  return res.status(200).json({ path });
};

module.exports = { uploadImage };
