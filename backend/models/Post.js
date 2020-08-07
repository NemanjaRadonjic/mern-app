const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  content: String,
  createdAt: Object,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  votes: {
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  voted: {
    liked: Boolean,
    disliked: Boolean,
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
