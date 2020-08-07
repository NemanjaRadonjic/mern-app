const User = require("../models/User");
const Post = require("../models/Post");

const moment = require("moment");

const fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username -_id");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const fetchPostsById = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find().populate("author", "username -_id");
    posts.map((post) => {
      post.votes.likes.map((id) => {
        if (id == userId) {
          post.voted.liked = true;
        }
      });
      post.votes.dislikes.map((id) => {
        if (id == userId) {
          post.voted.disliked = true;
        }
      });
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const fetchPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId).populate(
      "author",
      "username -_id"
    );
    res.json(post);
  } catch (error) {
    console.log(error);
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
    user = await User.findById(id);
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

const vote = async (req, res) => {
  const { postId } = req.params;
  const { type, userId } = req.body;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (error) {
    console.log(error);
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    console.log(error);
  }

  // checking if a user already voted on a post
  let alreadyLiked = post.votes.likes.some((user) => user == userId);
  let alreadyDisliked = post.votes.dislikes.some((user) => user == userId);

  if (alreadyLiked || alreadyDisliked) {
    res.status(401).json({ message: "You already voted" });
  } else {
    post.votes[type].push(user);
    try {
      await post.save();
    } catch (error) {
      console.log(error);
      res.status(500).json();
    }

    user.votedPosts[type].push(post);
    try {
      await user.save();
    } catch (error) {
      console.log(error);
      res.status(500).json();
    }
    res.status(201).json();
  }
};

module.exports = { createPost, fetchPosts, fetchPost, fetchPostsById, vote };
