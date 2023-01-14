const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const moment = require("moment");

const fetchPosts = async (req, res) => {
  const amount = JSON.parse(req.query.amount);
  const postsPerFetch = JSON.parse(req.query.postsPerFetch);
  let numOfDocuments;
  try {
    numOfDocuments = await Post.countDocuments();
  } catch (error) {
    return res.sendStatus(500);
  }

  try {
    if (numOfDocuments < postsPerFetch && amount === 10) {
      const posts = await Post.find().populate(
        "author",
        "username avatar background -_id"
      );
      const postsWithComments = await Promise.all(
        posts.map(async post => {
          const numOfComments = await Comment.countDocuments({
            post: post._id,
          });
          return { ...post._doc, comments: numOfComments };
        })
      );
      return res.json(postsWithComments);
    } else if (amount > numOfDocuments) {
      if (amount - postsPerFetch >= numOfDocuments) {
        return res.json([]);
      } else {
        const limit = postsPerFetch - (amount - numOfDocuments);
        const posts = await Post.find()
          .populate("author", "username avatar background -_id")
          .limit(limit);
        const postsWithComments = await Promise.all(
          posts.map(async post => {
            const numOfComments = await Comment.countDocuments({
              post: post._id,
            });
            return { ...post._doc, comments: numOfComments };
          })
        );
        return res.json(postsWithComments);
      }
    } else {
      const posts = await Post.find()
        .populate("author", "username avatar background -_id")
        .skip(numOfDocuments - amount)
        .limit(postsPerFetch);
      const postsWithComments = await Promise.all(
        posts.map(async post => {
          const numOfComments = await Comment.countDocuments({
            post: post._id,
          });
          return { ...post._doc, comments: numOfComments };
        })
      );
      return res.json(postsWithComments);
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const fetchPost = async (req, res) => {
  const { postId } = req.params;
  let post;
  try {
    post = await Post.findById(postId).populate(
      "author",
      "username avatar background -_id"
    );
  } catch (error) {
    return res.sendStatus(500);
  }

  if (!post) {
    return res.sendStatus(404);
  }
  return res.json(post);
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
    return res.sendStatus(404);
  }

  const post = new Post({
    content,
    author: user,
    createdAt: moment().format("MM/DD/YYYY, h:mm:ss A"),
    comments: 0,
  });

  try {
    await post.save();
  } catch (error) {
    return res.status(500);
  }

  return res.status(201).json(post);
};

const fetchComments = async (req, res) => {
  const { postId } = req.params;
  let comments;
  try {
    comments = await Comment.find({ post: postId }).populate(
      "author",
      "username avatar background -_id"
    );
  } catch (error) {
    return res.sendStatus(404);
  }
  return res.json([...comments]);
};

const createComment = async (req, res) => {
  const { content, userId, postId } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return res.sendStatus(500);
  }

  let post;
  try {
    post = await Post.findById(postId);
  } catch (error) {
    return res.sendStatus(500);
  }

  const comment = new Comment({
    content,
    author: user,
    post,
    createdAt: moment().format("MM/DD/YYYY, h:mm:ss A"),
  });

  try {
    await comment.save();
  } catch (error) {
    return res.sendStatus(500);
  }

  post.comments++;

  try {
    await post.save();
  } catch (error) {
    return res.sendStatus(500);
  }
  return res.status(201).json(comment);
};

const like = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

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
  // cheking if a user has already liked a post
  if (post.votes.likes.some(user => user == userId)) {
    // filter from post likes
    post.votes.likes = post.votes.likes.filter(id => id != userId);
    // filter from user likes
    user.votedPosts.likes = user.votedPosts.likes.filter(id => id != postId);
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
    post.votes.dislikes = post.votes.dislikes.filter(id => {
      id != userId;
    });
    post.votes.likes.push(user);

    try {
      await post.save();
    } catch (error) {
      return res.status(500).json("Couldn't save the post.");
    }

    // deleting a post from a users votedPosts dislikes and saving it to likes
    user.votedPosts.dislikes = user.votedPosts.dislikes.filter(
      id => id != postId
    );
    user.votedPosts.likes.push(post);

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
};

const dislike = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

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

  if (post.votes.dislikes.some(user => user == userId)) {
    // filter from post dislikes
    post.votes.dislikes = post.votes.dislikes.filter(id => id != userId);
    // filter from user dislikes
    user.votedPosts.dislikes = user.votedPosts.dislikes.filter(
      id => id != postId
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
    post.votes.likes = post.votes.likes.filter(id => id != userId);

    post.votes.dislikes.push(user);

    try {
      await post.save();
    } catch (error) {
      return res.status(500).json("Couldn't save the post.");
    }

    // deleting a post from a users votedPosts likes and saving it to dislikes
    user.votedPosts.likes = user.votedPosts.likes.filter(id => id != postId);
    user.votedPosts.dislikes.push(post);
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
};

const edit = async (req, res) => {
  const { postId } = req.params;
  const { newContent } = req.body;
  let post;
  try {
    post = await Post.findById(postId);
  } catch (error) {
    return res.sendStatus(404);
  }

  post.content = newContent;

  try {
    await post.save();
    return res.status(200).json({ newContent });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const remove = async (req, res) => {
  const { postId } = req.params;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (error) {
    return res.sendStatus(500);
  }

  try {
    post.votes.likes.map(async id => {
      const user = await User.findById(id);
      user.votedPosts.likes = user.votedPosts.likes.filter(id => id != postId);
      await user.save();
    });
  } catch (error) {
    return res.sendStatus(500);
  }

  try {
    post.votes.dislikes.map(async id => {
      const user = await User.findById(id);
      user.votedPosts.dislikes = user.votedPosts.dislikes.filter(
        id => id != postId
      );
      await user.save();
    });
  } catch (error) {
    return res.sendStatus(500);
  }

  try {
    await Post.deleteOne({ _id: postId });
  } catch (error) {
    return res.sendStatus(500);
  }

  let user;
  try {
    user = await User.findById(post.author);
  } catch (error) {
    return res.sendStatus(500);
  }

  try {
    await Comment.deleteMany({ post: postId });
  } catch (error) {
    return res.sendStatus(500);
  }
  return res.sendStatus(200);
};

module.exports = {
  createPost,
  createComment,
  fetchPosts,
  fetchPost,
  fetchComments,
  like,
  dislike,
  edit,
  remove,
};
