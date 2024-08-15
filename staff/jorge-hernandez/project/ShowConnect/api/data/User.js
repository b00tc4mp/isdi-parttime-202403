import { Schema, model } from 'mongoose'

const userSchema = new Schema({
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

  dates: {
    type: [String],
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

userSchema.pre('validate', function (next) {
  if (this.role === 'artist') {
    if (
      !this.artisticName ||
      !this.discipline ||
      !this.city ||
      !this.description ||
      !this.images ||
      !this.video ||
      !this.dates
    ) {
      next(
        new Error(
          'Todos los campos requeridos para artistas deben ser completados.'
        )
      )
    }
  }
  next()
})

const User = model('User', userSchema)

export default User
