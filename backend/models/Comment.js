const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  content: String,
  createdAt: Object,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  votes: {
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
