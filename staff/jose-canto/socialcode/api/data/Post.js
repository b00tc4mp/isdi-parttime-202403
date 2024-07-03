import { Schema, model } from "mongoose"

const post = new Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  liked: [{
    type: String,
  }],
  comments: [{
    type: {
      author: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true,
        default: Date.now
      }
    }
  }]
})

const Post = model("Post", post)

export default Post
