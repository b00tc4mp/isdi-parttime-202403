import { Schema, model, Types } from 'mongoose';
import constants from 'com/constants.js';
const { ObjectId } = Types;

const LogSchema = new Schema(
   {
      user: {
         type: ObjectId,
         ref: 'User',
         required: true
      },
      type: {
         type: String,
         required: true,
         enum: [
            constants.LOGGED_IN,
            constants.LOGGED_OUT,
            constants.REGISTERED,
            constants.LIKED_TRACK,
            constants.DISLIKED_TRACK,
            constants.SEARCHED,
            constants.CREATED_TRACK,
            constants.EDITED_TRACK,
            constants.REMOVED_TRACK,
            constants.PLAYED_TRACK,
            constants.PAUSED_TRACK,
            constants.SKIPPED_TRACK,
            constants.REWOUND_TRACK,
            constants.LOOPED_TRACK,
            constants.SHUFFLED_TRACK,
            constants.DOWNLOADED_TRACK,
            constants.ADJUSTED_VOLUME,
            constants.CREATED_PLAYLIST,
            constants.EDITED_PLAYLIST,
            constants.ADDED_TO_PLAYLIST,
            constants.REMOVED_FROM_PLAYLIST,
            constants.FOLLOWED_USER,
            constants.UNFOLLOWED_USER,
            constants.FOLLOWED_PLAYLIST,
            constants.UNFOLLOWED_PLAYLIST,
            constants.FOLLOWED_ALBUM,
            constants.UNFOLLOWED_ALBUM,
            constants.SYNCED_OFFLINE_TRACKS,
            constants.MANAGED_OFFLINE_STORAGE,
            constants.SHARED_TRACK,
            constants.SHARED_PLAYLIST,
            constants.VIEWED_USER_PLAYLISTS,
            constants.VIEWED_USER_FOLLOWERS,
            constants.VIEWED_USER_FOLLOWING,
            constants.VIEWED_USER_LIKED_TRACKS,
            constants.VIEWED_USER_CREATED_PLAYLISTS,
            constants.VIEWED_USER_CREATED_TRACKS,
            constants.VIEWED_USER_CREATED_ALBUMS
         ]
      },
      targetUser: {
         type: ObjectId,
         ref: 'User',
         required: function () {
            return [constants.FOLLOWED_USER, constants.UNFOLLOWED_USER].includes(this.type);
         }
      },
      track: {
         type: ObjectId,
         ref: 'Track',
         required: function () {
            return [
               constants.LIKED_TRACK,
               constants.DISLIKED_TRACK,
               constants.CREATED_TRACK,
               constants.EDITED_TRACK,
               constants.REMOVED_TRACK,
               constants.PLAYED_TRACK,
               constants.PAUSED_TRACK,
               constants.SKIPPED_TRACK,
               constants.REWOUND_TRACK,
               constants.LOOPED_TRACK,
               constants.SHUFFLED_TRACK,
               constants.DOWNLOADED_TRACK,
               constants.SHARED_TRACK
            ].includes(this.type);
         }
      },
      playlist: {
         type: ObjectId,
         ref: 'Playlist',
         required: function () {
            return [
               constants.CREATED_PLAYLIST,
               constants.EDITED_PLAYLIST,
               constants.ADDED_TO_PLAYLIST,
               constants.REMOVED_FROM_PLAYLIST,
               constants.FOLLOWED_PLAYLIST,
               constants.UNFOLLOWED_PLAYLIST,
               constants.SHARED_PLAYLIST,
               constants.VIEWED_USER_PLAYLISTS,
               constants.VIEWED_USER_CREATED_PLAYLISTS
            ].includes(this.type);
         }
      },
      album: {
         type: ObjectId,
         ref: 'Album',
         required: function () {
            return [constants.FOLLOWED_ALBUM, constants.UNFOLLOWED_ALBUM, constants.VIEWED_USER_CREATED_ALBUMS].includes(this.type);
         }
      },
      query: {
         type: String,
         trim: true,
         required: function () {
            return [constants.SEARCHED].includes(this.type);
         }
      }
   },
   { timestamps: true }
);

const Log = model('Log', LogSchema);
export default Log;
