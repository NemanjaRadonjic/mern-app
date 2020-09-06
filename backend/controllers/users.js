const User = require("../models/User");
const Post = require("../models/Post");

const fetchUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    return res.json(user);
  } catch (error) {
    return res.sendStatus(404);
  }
};

const fetchUserPosts = async (req, res) => {
  const { username } = req.params;
  let userId;
  try {
    const user = await User.findOne({ username });
    userId = user._id;
  } catch (error) {
    return res.sendStatus(404);
  }
  try {
    const posts = await Post.find({ author: userId }).populate(
      "author",
      "username avatar background -_id"
    );
    return res.json(posts);
  } catch (error) {
    return res.sendStatus(404);
  }
};

module.exports = { fetchUser, fetchUserPosts };
