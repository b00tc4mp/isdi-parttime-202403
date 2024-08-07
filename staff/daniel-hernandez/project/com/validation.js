import { InvalidArgumentError } from './errors.js';
import constants from './constants.js';

export const USERNAME_REGEX = /^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{3,13}[a-zA-Z0-9]$/;
export const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const OBJECT_ID_REGEX = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

function validateInputs(...args) {
   for (let i = 0; i < args.length; i++) {
      if (args[i] === undefined || args[i] === null || args[i] === '') {
         throw new InvalidArgumentError('All inputs are required');
      }
   }
}

function validateUsername(username) {
   if (typeof username !== 'string' || !USERNAME_REGEX.test(username)) {
      throw new InvalidArgumentError('Invalid username');
   }
}

function validateEmail(email) {
   if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      throw new InvalidArgumentError('Invalid email');
   }
}

function validatePassword(password) {
   if (typeof password !== 'string' || !PASSWORD_REGEX.test(password)) {
      throw new InvalidArgumentError('Invalid password');
   }
}

function validateObjectId(id) {
   if (typeof id !== 'string' || !OBJECT_ID_REGEX.test(id)) {
      throw new InvalidArgumentError('Invalid ObjectId');
   }
}

function validateLogType(type) {
   const validTypes = [
      constants.LOGGED_IN,
      constants.LOGGED_OUT,
      constants.REGISTERED,
      constants.LIKED_TRACK,
      constants.DISLIKED_TRACK,
      constants.SEARCHED_TRACK,
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
   ];

   if (!validTypes.includes(type)) {
      throw new InvalidArgumentError('Invalid log type');
   }
}

function validateTargetType(type) {
   if (!constants.types.includes(type)) {
      throw new InvalidArgumentError('Invalid target type');
   }
}

function validateQuery(query) {
   if (typeof query !== 'string' || query.trim() === '') {
      throw new InvalidArgumentError('Query must be a non-empty string');
   }
}

export default {
   inputs: validateInputs,
   objectId: validateObjectId,
   logType: validateLogType,
   targetType: validateTargetType,
   query: validateQuery,
   username: validateUsername,
   email: validateEmail,
   password: validatePassword
};
