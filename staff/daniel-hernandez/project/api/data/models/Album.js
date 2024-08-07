import { Schema, model, Types } from 'mongoose';
const { ObjectId } = Types;

const AlbumSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
         index: true
         /* match ? length limits ? */
      },
      artists: [
         {
            type: ObjectId,
            ref: 'User',
            required: true,
            index: true
         }
      ],
      releaseDate: {
         type: Date,
         required: true,
         default: Date.now
      },
      coverArt: {
         type: String,
         default: ''
         /* match ? */
      },
      tracks: [
         {
            type: ObjectId,
            ref: 'Track',
            required: true
         }
      ]
   },
   { timestamps: true }
);

const Album = model('Album', AlbumSchema);
export default Album;
