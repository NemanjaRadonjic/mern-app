const User = require("../models/User");
const Post = require("../models/Post");

const fetchPosts = async (req, res) => {
  try {
    const response = await Post.find().populate("author", "username -_id");
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const createPost = async (req, res) => {
  const { title, content, email } = req.body;
  let errors = {
    title: "",
    content: "",
  };

  if (title.length === 0) {
    errors.title = "Please enter a title.";
  }
  if (content.length === 0) {
    errors.content = "Please enter content of your post.";
  }

  if (errors.title || errors.content) {
    return res.status(422).json({ errors });
  }

  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    res.json({
      success: false,
      message: "Couldn't find a user with that email.",
    });
  }

  const post = new Post({ title, content });

  post.author = user;

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
