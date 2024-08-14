import { Schema, model } from 'mongoose'

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  artisticName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
  },
  discipline: {
    type: String,
  },
  description: {
    type: String,
  },
  images: {
    type: String,
  },
  video: {
    type: String,
  },
  //   ratings: [
  //     {
  //       type: String,
  //     },
  //   ],

  dates: {
    type: [String],
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['artist', 'client'],
    default: 'artist',
  },
})

const User = model('User', user)

export default User
