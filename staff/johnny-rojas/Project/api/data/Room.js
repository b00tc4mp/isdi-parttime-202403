import { Schema, model, Types } from 'mongoose';

const { ObjectId } = Types;

const room = new Schema({
  author: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  nameRoom: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true
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
  likes: [{
    type: ObjectId,
    ref: 'User'
  }],
  manager: {
    type: ObjectId,
    ref:'User'
  },
  isBlocked: {
    type: Boolean,
    default: false
  }
});

const Room = model('Room', room);

export default Room;