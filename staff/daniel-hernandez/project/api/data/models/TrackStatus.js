import { Schema, model, Types } from 'mongoose';
const { ObjectId } = Types;

const TrackStatusSchema = new Schema({
   user: {
      type: ObjectId,
      ref: 'User',
      required: true
   },
   track: {
      type: ObjectId,
      ref: 'Track',
      required: true
   },
   isLocal: {
      type: Boolean,
      default: false,
      required: true
   },
   tags: [
      {
         type: String,
         trim: true
      }
   ],
   note: { type: String, trim: true }
});

const TrackStatus = new model('TrackStatus', TrackStatusSchema);
export default TrackStatus;
