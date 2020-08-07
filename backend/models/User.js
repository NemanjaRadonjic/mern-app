const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  votedPosts: {
    likes: [{ type: mongoose.Schema.Types.ObjectId, red: "post" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, red: "post" }],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
