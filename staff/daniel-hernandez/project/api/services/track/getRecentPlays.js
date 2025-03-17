import { User, Log } from '../../data/index.js';
import { CredentialError, SystemError } from 'com/errors.js';
import transformDocument from '../../utils/transformDocument.js';
import validate from 'com/validation.js';
import constants from 'com/constants.js';
import log from '../log.js';

const getRecentPlays = userId => {
   validate.inputs(userId);
   validate.objectId(userId);

   return (async () => {
      let user, recentPlays;

      try {
         user = await User.findById(userId).lean();
      } catch (error) {
         throw new SystemError(`Fetching recent plays failed: ${error.message}`);
      }

      if (!user) {
         throw new CredentialError('User does not exist');
      }

      try {
         recentPlays = await Log.aggregate([
            { $match: { type: constants.PLAYED_TRACK, user: user._id } },
            { $sort: { createdAt: -1 } },
            { $group: { _id: '$track', latestLog: { $first: '$$ROOT' } } },
            { $sort: { 'latestLog.createdAt': -1 } },
            { $limit: 10 },
            { $lookup: { from: 'tracks', localField: '_id', foreignField: '_id', as: 'track' } },
            { $unwind: '$track' },
            { $lookup: { from: 'users', localField: 'track.artists', foreignField: '_id', as: 'artists' } },
            { $lookup: { from: 'albums', localField: 'track.album', foreignField: '_id', as: 'album' } },
            { $addFields: { album: { $arrayElemAt: ['$album', 0] } } },
            { $project: { name: '$track.name', artists: { $map: { input: '$artists', as: 'artist', in: { _id: '$$artist._id', username: '$$artist.username' } } }, duration: '$track.duration', album: { _id: '$album._id', name: '$album.name' }, coverArt: '$track.coverArt' } }
         ]);
      } catch (error) {
         throw new SystemError(`Fetching recent plays failed: ${error.message}`);
      }

      const recentTracks = transformDocument(recentPlays);

      try {
         await log(userId, constants.VIEWED_USER_RECENT_PLAYS);
      } catch (error) {
         throw new SystemError(`Failed to get recent plays: ${error.message}`);
      }

      return {
         tracks: recentTracks
      };
   })();
};

export default getRecentPlays;
