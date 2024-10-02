import { Schema, model, Types } from 'mongoose';
const { ObjectId } = Types;

const TrackSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
         index: true
         /* match ? length limits ? */
      },
      addedBy: {
         type: ObjectId,
         required: true,
         ref: 'User'
      },
      artists: [
         {
            type: ObjectId,
            required: true,
            ref: 'User',
            index: true
         }
      ],
      album: {
         type: ObjectId,
         ref: 'Album',
         index: true
      },
      duration: {
         type: Number,
         required: true,
         min: [0, 'Duration must be positive']
      },
      genre: {
         type: String,
         default: 'Unknown',
         index: true
      },
      releaseDate: {
         type: Date,
         required: true,
         default: Date.now,
         index: true
      },
      coverArt: {
         type: String,
         default: ''
         /* match ? */
      },
      lyrics: {
         type: String,
         default: ''
      }
   },
   { timestamps: true }
);

const Track = model('Track', TrackSchema);
export default Track;
