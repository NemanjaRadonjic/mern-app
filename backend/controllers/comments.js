const Comment = require("../models/Comment");
const User = require("../models/User");

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

  if (comment.votes.likes.some((user) => user == userId)) {
    comment.votes.likes = comment.votes.likes.filter((id) => id != userId);
  } else {
    if (comment.votes.dislikes.some((user) => user == userId)) {
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

  if (comment.votes.dislikes.some((user) => user == userId)) {
    comment.votes.dislikes = comment.votes.dislikes.filter(
      (id) => id != userId
    );
  } else {
    if (comment.votes.likes.some((user) => user == userId)) {
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

module.exports = { like, dislike };
