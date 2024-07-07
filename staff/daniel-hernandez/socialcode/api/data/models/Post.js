import { Schema, model, Types } from "mongoose";

const { ObjectId } = Types;

const postSchema = new Schema({
  author: {
    type: ObjectId,
    required: true,
    ref: "User",
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
      type: ObjectId,
      ref: "User",
    },
  ],
});

const Post = model("Post", postSchema);

export default Post;
