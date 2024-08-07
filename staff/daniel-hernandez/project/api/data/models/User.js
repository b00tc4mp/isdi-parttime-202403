import { Schema, model, Types } from 'mongoose';
import { USERNAME_REGEX, EMAIL_REGEX } from 'com/validation.js';
const { ObjectId } = Types;

const UserSchema = new Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
         trim: true,
         match: [USERNAME_REGEX, 'Invalid username format']
         /* length limits ? */
      },
      email: {
         type: String,
         required: true,
         trim: true,
         unique: true,
         match: [EMAIL_REGEX, 'Invalid email format']
      },
      passwordHash: {
         type: String,
         required: true
      },
      bio: {
         type: String,
         default: '',
         maxLength: 300
      },
      profileImage: {
         type: String,
         default: ''
         /* match ? */
      },
      likedTracks: [
         {
            type: ObjectId,
            ref: 'Track'
         }
      ],
      likedAlbums: [
         {
            type: ObjectId,
            ref: 'Album'
         }
      ],

      followingPlaylists: [
         {
            type: ObjectId,
            ref: 'Playlist'
         }
      ],
      following: [
         {
            type: ObjectId,
            ref: 'User'
         }
      ],
      followers: [
         {
            type: ObjectId,
            ref: 'User'
         }
      ],
      settings: {
         theme: {
            type: String,
            default: 'dark',
            enum: ['dark', 'light']
         },
         notifications: {
            type: Boolean,
            default: false
         }
      }
   },
   { timestamps: true }
);

/* UserSchema.pre('save', async function (next) {
   try {

      next();
   } catch (error) {
      next(error);
   }
}); */

const User = model('User', UserSchema);
export default User;
