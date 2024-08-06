import { Schema, model, Types } from 'mongoose';
import { NAMEROOM_REGEX, REGION_REGEX } from '../../com/validate.js';

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
    match: NAMEROOM_REGEX
  },
  city: {
    type: String,
    required: true
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
  services: {
    type: [String],  // Cambiado de ObjectId a String para guardar los nombres de los servicios
    enum: ['wifi', 'parking', 'pool', 'pets', 'foodBank', 'handicap', 'atention'], // Opciones válidas
    default: [] // Valor por defecto si no se especifica
  },
  price: {
    type: String,
    required: true
  },
  availability: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  likes: [{
    type: ObjectId,
    ref: 'User'
  }],
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
}, {
  timestamps: true
});

room.index({ location: '2dsphere' });

const Room = model('Room', room);

export default Room;