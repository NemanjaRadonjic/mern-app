const User = require("../models/User");
const { decode } = require("jsonwebtoken");

const uploadAvatar = async (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  const { path } = req.file;
  const { id } = decode(accessToken);
  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }

  user.avatar = path;
  user.avatars.push(path);

  try {
    user.save();
  } catch (error) {
    return res.sendStatus(500);
  }

  return res.status(200).json({ path });
};

module.exports = { uploadAvatar };
