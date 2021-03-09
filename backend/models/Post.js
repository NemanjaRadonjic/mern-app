const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  content: String,
  createdAt: Object,
  comments: Number,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  votes: {
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
