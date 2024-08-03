import { Schema, model } from 'mongoose'

const booking = new Schema({
  user: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['available', 'not available'], 
  }
});

const Booking = model('Booking', booking);

export default Booking;