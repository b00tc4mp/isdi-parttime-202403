import { Schema, model } from 'mongoose'

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  artisticName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  discipline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
  video: {
    type: String,
  },
  //   ratings: [
  //     {
  //       type: String,
  //     },
  //   ],
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
})

const User = model('User', user)

export default User
