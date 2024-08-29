import { Schema, model, now } from "mongoose"

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
})

const User = model("User", user)


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

export {
  User,
  Post,
}