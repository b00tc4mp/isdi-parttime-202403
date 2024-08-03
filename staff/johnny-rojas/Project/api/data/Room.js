import { Schema, model, Types } from 'mongoose';
import { NAME_REGEX, REGION_REGEX } from '../../com/validate.js';

const { ObjectId } = Types

const room = new Schema({
  author: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
    match: NAME_REGEX
  },
  region: {
    type: String,
    required: true,
    match: REGION_REGEX
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    required: true
  },
  likes: [{
    type: ObjectId,
    ref: 'User'
  }],
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


const Room = model('Room', room);

export default Room;