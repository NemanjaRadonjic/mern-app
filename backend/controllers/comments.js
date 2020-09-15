const Comment = require("../models/Comment");
const User = require("../models/User");
const Post = require("../models/Post");

const like = async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.body;

  let comment;
  try {
    comment = await Comment.findById(commentId);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  let votes = {
    disliked: false,
    liked: false,
  };

  if (comment.votes.likes.some((id) => id == userId)) {
    comment.votes.likes = comment.votes.likes.filter((id) => id != userId);
  } else {
    if (comment.votes.dislikes.some((id) => id == userId)) {
      comment.votes.dislikes = comment.votes.dislikes.filter(
        (id) => id != userId
      );
      comment.votes.likes.push(user);
      votes.liked = true;
    } else {
      comment.votes.likes.push(user);
      votes.liked = true;
    }
  }

  try {
    await comment.save();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  return res.status(201).json({ ...votes });
};

const dislike = async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.body;

  let comment;
  try {
    comment = await Comment.findById(commentId);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  let votes = {
    disliked: false,
    liked: false,
  };

  if (comment.votes.dislikes.some((id) => id == userId)) {
    comment.votes.dislikes = comment.votes.dislikes.filter(
      (id) => id != userId
    );
  } else {
    if (comment.votes.likes.some((id) => id == userId)) {
      comment.votes.likes = comment.votes.likes.filter((id) => id != userId);
      comment.votes.dislikes.push(user);
      votes.disliked = true;
    } else {
      comment.votes.dislikes.push(user);
      votes.disliked = true;
    }
  }

  try {
    await comment.save();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  return res.status(201).json({ ...votes });
};

const remove = async (req, res) => {
  const { commentId } = req.params;
  let comment;
  let postId;
  try {
    comment = await Comment.findById(commentId);
    postId = comment.post;
    comment.deleteOne();
  } catch (error) {
    return res.sendStatus(500);
  }

  let post;
  try {
    post = await Post.findById(postId);
    post.comments.filter((id) => id != commentId);
  } catch (error) {
    return res.sendStatus(500);
  }

  try {
    await post.save();
  } catch (error) {
    return res.sendStatus(500);
  }

  return res.sendStatus(200);
};

module.exports = { like, dislike, remove };
