import { Schema, model, Types } from 'mongoose';
import { NAMEROOM_REGEX, REGION_REGEX } from '../../com/validate.js';

const { ObjectId } = Types

const room = new Schema({
  author: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  nameRoom: {
    type: String,
    required: true,
    match: NAMEROOM_REGEX
  },
  region: {
    type: String,
    required: true,
    match: REGION_REGEX
  },
  contact: { 
    name: String,
    surname: String,
    email: String,
    phone: String
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
    //TODO Dates Strat-End
  },
  likes: [{
    type: [],
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

