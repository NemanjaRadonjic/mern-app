const User = require("../models/User");
const Post = require("../models/Post");

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
    if (numOfDocuments < postsPerFetch) {
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
    if (numOfDocuments < postsPerFetch) {
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
    if (numOfDocuments < postsPerFetch) {
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

module.exports = {
  fetchUser,
  fetchUserPosts,
  fetchLikedUserPosts,
  fetchDislikedUserPosts,
  fetchUserImages,
};
