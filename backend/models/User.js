const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  avatar: String,
  avatars: Array,
  background: String,
  backgrounds: Array,
  username: String,
  email: String,
  password: String,
  votedPosts: {
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  votedComments: {
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
