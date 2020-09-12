const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  content: String,
  createdAt: Object,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  votes: {
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
