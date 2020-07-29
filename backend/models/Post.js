const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
