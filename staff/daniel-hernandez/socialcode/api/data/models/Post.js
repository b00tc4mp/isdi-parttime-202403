import { Schema, model } from "mongoose";
import { USERNAME_REGEX } from "com/validate.js";

const postSchema = new Schema({
  author: {
    type: String,
    required: true,
    match: [USERNAME_REGEX, "Invalid Username"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Please provide a title"],
    trim: true,
  },

  image: {
    type: String,
    required: [true, "Please provide a image"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  likes: [
    {
      type: String,
    },
  ],
});

const Post = model("Post", postSchema);

export default Post;
