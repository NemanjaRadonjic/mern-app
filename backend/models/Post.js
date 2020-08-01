const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  content: String,
  createdAt: Object,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
