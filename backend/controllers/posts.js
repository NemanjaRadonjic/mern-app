const User = require("../models/User");
const Post = require("../models/Post");

const moment = require("moment");

const fetchPosts = async (req, res) => {
  try {
    const response = await Post.find().populate("author", "username -_id");
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const createPost = async (req, res) => {
  const { content, id } = req.body;
  let errors = "";

  if (content.length === 0) {
    errors = "Please enter content of your post.";
  }
  if (errors) {
    return res.status(422).json(errors);
  }

  let user;
  try {
    user = await User.findOne({ id });
  } catch (error) {
    res.json({
      success: false,
      message: "Couldn't find a user with that id.",
    });
  }

  const post = new Post({ content });

  post.author = user;
  post.createdAt = moment().format("MM/DD/YYYY, h:mm:ss A");

  try {
    await post.save();
  } catch (error) {
    res.json({
      success: false,
      message: "Couldn't save the post.",
    });
  }

  user.posts.push(post);

  try {
    await user.save();
  } catch (error) {
    res.json({
      success: false,
      message: "Couldn't save the user.",
    });
  }

  res.status(201).send();
};

module.exports = { createPost, fetchPosts };
