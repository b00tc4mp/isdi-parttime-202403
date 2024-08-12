import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const booking = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  room: {
    type: ObjectId,
    required: true,
    ref: 'Room'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
});

const Booking = model('Booking', booking);

export default Booking;