const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema({
  is_active: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },

  author: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post, postSchema };
