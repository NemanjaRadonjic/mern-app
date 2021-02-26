const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  avatar: String,
  avatars: Array,
  background: String,
  backgrounds: Array,
  username: String,
  email: String,
  password: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  votedPosts: {
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  },
  votedComments: {
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
