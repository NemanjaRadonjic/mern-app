const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const bcrypt = require("bcrypt");

const fetchUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.json(user);
    }
    return res.sendStatus(404);
  } catch (error) {
    return res.sendStatus(404);
  }
};

const fetchUserPosts = async (req, res) => {
  const { username } = req.params;
  const amount = JSON.parse(req.query.amount);
  const postsPerFetch = JSON.parse(req.query.postsPerFetch);

  let userId;
  try {
    const user = await User.findOne({ username });
    userId = user._id;
  } catch (error) {
    return res.sendStatus(404);
  }

  let numOfDocuments;
  try {
    numOfDocuments = await Post.countDocuments({ author: userId });
  } catch (error) {
    return res.sendStatus(500);
  }

  try {
    if (numOfDocuments < postsPerFetch && amount === 10) {
      const userPosts = await Post.find({
        author: userId,
      }).populate("author", "username avatar background -_id");
      return res.json(userPosts);
    } else if (amount > numOfDocuments) {
      if (amount - postsPerFetch >= numOfDocuments) {
        return res.json([]);
      } else {
        const limit = postsPerFetch - (amount - numOfDocuments);
        const userPosts = await Post.find({
          author: userId,
        })
          .populate("author", "username avatar background -_id")
          .limit(limit);
        return res.json(userPosts);
      }
    } else {
      const userPosts = await Post.find({ author: userId })
        .populate("author", "username avatar background -_id")
        .skip(numOfDocuments - amount)
        .limit(postsPerFetch);
      return res.json(userPosts);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

const fetchLikedUserPosts = async (req, res) => {
  const { username } = req.params;
  const amount = JSON.parse(req.query.amount);
  const postsPerFetch = JSON.parse(req.query.postsPerFetch);

  let userId;
  try {
    const user = await User.findOne({ username });
    userId = user._id;
  } catch (error) {
    return res.sendStatus(404);
  }

  let numOfDocuments;
  try {
    numOfDocuments = await Post.countDocuments({ "votes.likes": userId });
  } catch (error) {
    return res.sendStatus(500);
  }

  try {
    if (numOfDocuments < postsPerFetch && amount === 10) {
      const likedPosts = await Post.find({
        "votes.likes": userId,
      }).populate("author", "username avatar background -_id");
      return res.json(likedPosts);
    } else if (amount > numOfDocuments) {
      if (amount - postsPerFetch >= numOfDocuments) {
        return res.json([]);
      } else {
        const limit = postsPerFetch - (amount - numOfDocuments);
        const likedPosts = await Post.find({
          "votes.likes": userId,
        })
          .populate("author", "username avatar background -_id")
          .limit(limit);
        return res.json(likedPosts);
      }
    } else {
      const likedPosts = await Post.find({ "votes.likes": userId })
        .populate("author", "username avatar background -_id")
        .skip(numOfDocuments - amount)
        .limit(postsPerFetch);
      return res.json(likedPosts);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

const fetchDislikedUserPosts = async (req, res) => {
  const { username } = req.params;
  const amount = JSON.parse(req.query.amount);
  const postsPerFetch = JSON.parse(req.query.postsPerFetch);
  let userId;
  try {
    const user = await User.findOne({ username });
    userId = user._id;
  } catch (error) {
    return res.sendStatus(404);
  }

  let numOfDocuments;
  try {
    numOfDocuments = await Post.countDocuments({ "votes.dislikes": userId });
  } catch (error) {
    return res.sendStatus(500);
  }

  try {
    if (numOfDocuments < postsPerFetch && amount === 10) {
      const dislikedPosts = await Post.find({
        "votes.dislikes": userId,
      }).populate("author", "username avatar background -_id");
      return res.json(dislikedPosts);
    } else if (amount > numOfDocuments) {
      if (amount - postsPerFetch >= numOfDocuments) {
        return res.json([]);
      } else {
        const limit = postsPerFetch - (amount - numOfDocuments);
        const dislikedPosts = await Post.find({
          "votes.dislikes": userId,
        })
          .populate("author", "username avatar background -_id")
          .limit(limit);
        return res.json(dislikedPosts);
      }
    } else {
      const dislikedPosts = await Post.find({ "votes.dislikes": userId })
        .populate("author", "username avatar background -_id")
        .skip(numOfDocuments - amount)
        .limit(postsPerFetch);
      return res.json(dislikedPosts);
    }
  } catch (error) {
    return res.sendStatus(500);
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

const changeUsername = async (req, res) => {
  const { username, newUsername } = req.body;
  let user;
  try {
    user = await User.findOne({ username });
  } catch (error) {
    return res.sendStatus(404);
  }

  try {
    user.username = newUsername;
    await user.save();
    return res.json({ username: user.username });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const changeEmail = async (req, res) => {
  const { username, newEmail, password } = req.body;
  let user;
  try {
    user = await User.findOne({ username });
  } catch (error) {
    return res.sendStatus(404);
  }
  console.log("user password:", user.password);
  console.log(password);
  let validPassword;
  try {
    validPassword = await bcrypt.compare(password, user.password);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong with comparing passwords." });
  }
  if (!validPassword) {
    return res.status(422).json({
      field: "password",
      message: "Password is not correct.",
    });
  }

  try {
    user.email = newEmail;
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const changePassword = async (req, res) => {
  const { username, password, newPassword } = req.body;
  let user;
  try {
    user = await User.findOne({ username });
  } catch (error) {
    return res.sendStatus(404);
  }

  let validPassword;
  try {
    validPassword = await bcrypt.compare(password, user.password);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong with comparing passwords." });
  }
  if (!validPassword) {
    return res
      .status(422)
      .json({ field: "currentPassword", message: "Password is not corrent." });
  }

  try {
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const deleteUser = async (req, res) => {
  const { username } = req.params;

  let user;
  try {
    user = await User.findOne({ username });
  } catch (error) {
    return res.sendStatus(500);
  }

  try {
    user.votedPosts.likes.map(async (id) => {
      const post = await Post.findById(id);
      post.votes.likes = post.votes.likes.filter((id) => id != user.id);
      await post.save();
    });

    user.votedPosts.dislikes.map(async (id) => {
      const post = await Post.findById(id);
      post.votes.dislikes = post.votes.dislikes.filter((id) => id != user.id);
      await post.save();
    });
  } catch (error) {
    return res.sendStatus(500);
  }

  try {
    user.votedComments.likes.map(async (id) => {
      const comment = await Comment.findById(id);
      comment.votes.likes = comment.votes.likes.filter((id) => id != user.id);
      await comment.save();
    });

    user.votedComments.dislikes.map(async (id) => {
      const comment = await Comment.findById(id);
      comment.votes.dislikes = comment.votes.dislikes.filter(
        (id) => id != user.id
      );
      await comment.save();
    });
  } catch (error) {
    return res.sendStatus(500);
  }

  try {
    await Post.deleteMany({ author: user.id });
  } catch (error) {
    return res.sendStatus(500);
  }

  try {
    await Comment.deleteMany({ author: user.id });
  } catch (error) {
    return res.sendStatus(500);
  }

  try {
    await User.deleteOne({ _id: user.id });
  } catch (error) {
    return res.sendStatus(500);
  }

  return res.sendStatus(200);
};

module.exports = {
  fetchUser,
  fetchUserPosts,
  fetchLikedUserPosts,
  fetchDislikedUserPosts,
  fetchUserImages,
  changeUsername,
  changeEmail,
  changePassword,
  deleteUser,
};
