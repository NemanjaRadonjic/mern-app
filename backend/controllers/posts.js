const User = require("../models/User");
const Post = require("../models/Post");

const moment = require("moment");

const fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate(
      "author",
      "username avatar background -_id"
    );
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const fetchPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId).populate(
      "author",
      "username avatar background -_id"
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

  res.status(201).json({ ...post });
};

const vote = async (req, res) => {
  const { postId } = req.params;
  // type is either likes or dislikes
  const { type, userId } = req.body;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (error) {
    return res.status(404).json({ message: "Couldn't find a post." });
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return res.status(404).json({ message: "Couldn't find a user." });
  }

  // checking if a user already voted on a post
  if (type === "likes") {
    // check if a user has already liked a post
    if (post.votes.likes.some((user) => user == userId)) {
      // filter from post likes
      post.votes.likes = post.votes.likes.filter((id) => id != userId);
      // filter from user likes
      user.votedPosts.likes = user.votedPosts.likes.filter(
        (id) => id != postId
      );
      // save
      try {
        await post.save();
      } catch (error) {
        return res.status(500).json("Couldn't save the post.");
      }
      try {
        await user.save();
      } catch (error) {
        return res.status(500).json("Couldn't save the user.");
      }
      return res.status(201).json({ liked: false, disliked: false });
    } else {
      // deleting a user from dislikes if he wants to like and saving the user to that posts likes
      post.votes.dislikes = post.votes.dislikes.filter((id) => {
        id != userId;
      });
      post.votes[type].push(user);

      try {
        await post.save();
      } catch (error) {
        return res.status(500).json("Couldn't save the post.");
      }

      // deleting a post from a users votedPosts dislikes and saving it to likes
      user.votedPosts.dislikes = user.votedPosts.dislikes.filter(
        (id) => id != postId
      );
      user.votedPosts[type].push(post);

      try {
        await user.save();
      } catch (error) {
        return res.status(500).json("Couldn't save the post.");
      }
      return res.status(201).json({
        liked: true,
        disliked: false,
      });
    }
  } else {
    // check if a user has already disliked a post
    if (post.votes.dislikes.some((user) => user == userId)) {
      // filter from post dislikes
      post.votes.dislikes = post.votes.dislikes.filter((id) => id != userId);
      // filter from user dislikes
      user.votedPosts.dislikes = user.votedPosts.dislikes.filter(
        (id) => id != postId
      );
      // save
      try {
        await post.save();
      } catch (error) {
        return res.status(500).json("Couldn't save the post.");
      }
      try {
        await user.save();
      } catch (error) {
        return res.status(500).json("Couldn't save the user.");
      }
      return res.status(201).json({ liked: false, disliked: false });
    } else {
      // deleting a user from likes if he wants to dislike and saving the user to that posts dislikes
      post.votes.likes = post.votes.likes.filter((id) => id != userId);

      post.votes[type].push(user);

      try {
        await post.save();
      } catch (error) {
        return res.status(500).json("Couldn't save the post.");
      }

      // deleting a post from a users votedPosts likes and saving it to dislikes
      user.votedPosts.likes = user.votedPosts.likes.filter(
        (id) => id != postId
      );
      user.votedPosts[type].push(post);
      try {
        await user.save();
      } catch (error) {
        return res.status(500).json("Couldn't save the user.");
      }
      return res.status(201).json({
        liked: false,
        disliked: true,
      });
    }
  }
};

module.exports = { createPost, fetchPosts, fetchPost, vote };