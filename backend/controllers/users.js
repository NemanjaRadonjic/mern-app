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

const fetchLikedUserPosts = async (req, res) => {
  const { username } = req.params;
  let userId;
  try {
    const user = await User.findOne({ username });
    userId = user._id;
  } catch (error) {
    return res.sendStatus(404);
  }
  try {
    const posts = await Post.find({}).populate(
      "author",
      "username avatar background -_id"
    );
    console.log(posts);
    const likedPosts = posts.filter((post) =>
      post.votes.likes.includes(userId)
    );
    console.log("liked: ", likedPosts);
    return res.json(likedPosts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
};

const fetchDislikedUserPosts = async (req, res) => {
  const { username } = req.params;
  let userId;
  try {
    const user = await User.findOne({ username });
    userId = user._id;
  } catch (error) {
    return res.sendStatus(404);
  }
  try {
    const posts = await Post.find({}).populate(
      "author",
      "username avatar background -_id"
    );
    const dislikedPosts = posts.filter((post) =>
      post.votes.dislikes.includes(userId)
    );
    return res.json(dislikedPosts);
  } catch (error) {
    return res.sendStatus(404);
  }
};

const fetchUserImages = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    const { avatars, backgrounds } = user;
    return res.json({ avatars, backgrounds });
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
};

module.exports = {
  fetchUser,
  fetchUserPosts,
  fetchLikedUserPosts,
  fetchDislikedUserPosts,
  fetchUserImages,
};
