import { InvalidArgumentError } from './errors.js';
import constants from './constants.js';

export const USERNAME_REGEX = /^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{3,13}[a-zA-Z0-9]$/;
export const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const OBJECT_ID_REGEX = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
export const JWT_REGEX = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

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

function validateQueryTypes(types) {
   if (!Array.isArray(types)) {
      throw new InvalidArgumentError('Expected an array of query types');
   }

   const validTypes = [...constants.queryTypes];

   for (const type of types) {
      if (!validTypes.includes(type)) {
         throw new InvalidArgumentError('Invalid query type within array');
      }
   }
}

function validateQuery(query) {
   if (typeof query !== 'string' || query.trim() === '') {
      throw new InvalidArgumentError('Query must be a non-empty string');
   }
}

function isBase64Url(str) {
   const b64urlPattern = /^[A-Za-z0-9-_]+$/;
   return b64urlPattern.test(str);
}

function validateToken(token) {
   if (typeof token !== 'string' || !JWT_REGEX.test(token)) {
      throw new InvalidArgumentError('Invalid token');
   }

   const parts = token.split('.');

   if (parts.length !== 3) {
      throw new InvalidArgumentError('Invalid token');
   }

   const [header, payload, signature] = parts;

   if (!isBase64Url(header) || !isBase64Url(payload) || !isBase64Url(signature)) {
      throw new InvalidArgumentError('Invalid token');
   }
}

function validateRange(range) {
   if (!range || typeof range !== 'string' || !range.startsWith('bytes=')) {
      throw new InvalidArgumentError('Invalid range format');
   }

   const parts = range.substring(6).split('-');
   if (parts.length !== 2) {
      throw new InvalidArgumentError('Invalid range format');
   }

   const start = parts[0] ? parseInt(parts[0], 10) : undefined;
   const end = parts[1] ? parseInt(parts[1], 10) : undefined;

   if (start !== undefined && isNaN(start)) {
      throw new InvalidArgumentError('Invalid range start value');
   }

   if (end !== undefined && isNaN(end)) {
      throw new InvalidArgumentError('Invalid range end value');
   }

   if (start !== undefined && start < 0) {
      throw new InvalidArgumentError('Invalid range. Start value must be >= 0');
   }

   if (start !== undefined && end !== undefined && end < start) {
      throw new InvalidArgumentError('Invalid range. End value must be >= start value');
   }

   if (start === undefined && end === undefined) {
      throw new InvalidArgumentError('Invalid range. Both start and end cannot be undefined');
   }
}

function validateLimit(limit) {
   if (!limit || typeof limit !== 'number' || !Number.isInteger(limit) || limit <= 0 || limit > constants.MAX_LIMIT) {
      throw new InvalidArgumentError('Invalid limit');
   }
}

function validatePage(page) {
   if (!page || typeof page !== 'number' || isNaN(page) || !Number.isInteger(page) || page <= 0) {
      throw new InvalidArgumentError('Invalid page');
   }
}

export default {
   inputs: validateInputs,
   range: validateRange,
   objectId: validateObjectId,
   logType: validateLogType,
   targetType: validateTargetType,
   query: validateQuery,
   queryTypes: validateQueryTypes,
   limit: validateLimit,
   page: validatePage,
   token: validateToken,
   username: validateUsername,
   email: validateEmail,
   password: validatePassword
};
