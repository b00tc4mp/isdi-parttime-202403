import { Schema, model } from 'mongoose'
import { NAME_REGEX } from '../../com/validate.js'

const room = new Schema({
  name: {
    type: String,
    required: true,
    match: NAME_REGEX
  },
  region: {
    type: String,
    required: true
  },
  type: {
    type: [String],
    required: true
  },
  price: {
    type: String,
    required: true
  },
  availability: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

const Room = model('Room', room)

export default Room

