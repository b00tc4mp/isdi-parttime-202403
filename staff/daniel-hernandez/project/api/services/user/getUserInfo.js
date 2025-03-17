import { User, Track, Album, Playlist } from '../../data/index.js';
import { CredentialError, NotFoundError, SystemError } from 'com/errors.js';
import transformDocument from '../../utils/transformDocument.js';
import validate from 'com/validation.js';
import constants from 'com/constants.js';
import log from '../log.js';

const getUserInfo = (userId, targetUserId) => {
   validate.inputs(userId, targetUserId);
   validate.objectId(userId);
   validate.objectId(targetUserId);

   return (async () => {
      let user, targetUser, targetUserInfo, popularTracks, recentTracks, albums, playlists;

      try {
         user = await User.findById(userId).lean();
      } catch (error) {
         throw new SystemError(`Fetching user info failed: ${error.message}`);
      }

      if (!user) {
         throw new CredentialError("User doesn't exist");
      }

      try {
         targetUser = await User.findById(targetUserId).lean();
       } catch (error) {
         throw new SystemError(`Fetching user info failed: ${error.message}`);
      }

      if (!targetUser) {
         throw new NotFoundError("Target user doesn't exist");
      }

      try {
         [targetUserInfo, popularTracks, recentTracks, albums, playlists] = await Promise.all([
            // Gets the target user info
            User.aggregate([
               { $match: { _id: targetUser._id } },
               { $addFields: { followerCount: { $size: '$followers' }, followingCount: { $size: '$following' } } },
               { $project: { username: 1, followers: '$followerCount', following: '$followingCount', isFollowed: { $in: [user._id, '$followers'] }, profileImage: 1 } }
            ]),

            // Gets popular tracks created by the target user based on play logs (excluding plays by the target user)
            Track.aggregate([
               { $match: { $or: [{ addedBy: targetUser._id }, { artists: { $in: [targetUser._id] } }] } },
               { $lookup: { from: 'logs', localField: '_id', foreignField: 'track', as: 'trackLogs' } },
               { $unwind: { path: '$trackLogs' } },

               // Filter out logs where the user is the target user
               { $match: { 'trackLogs.user': { $ne: targetUser._id } } },

               // Group by track id to count plays and retain track details
               { $group: { _id: '$_id', plays: { $sum: 1 }, name: { $first: '$name' }, artists: { $first: '$artists' }, duration: { $first: '$duration' }, coverArt: { $first: '$coverArt' }, album: { $first: '$album' } } },

               { $sort: { plays: -1 } },
               { $limit: 10 },
               { $lookup: { from: 'users', localField: 'artists', foreignField: '_id', as: 'artists' } },
               { $lookup: { from: 'albums', localField: 'album', foreignField: '_id', as: 'album' } },
               { $unwind: '$album' },
               { $project: { name: 1, artists: { _id: 1, username: 1 }, duration: 1, album: { _id: 1, name: 1 }, coverArt: 1, plays: 1 } }
            ]),

            // Gets recent tracks added or performed by the target user
            Track.aggregate([
               { $match: { $or: [{ addedBy: targetUser._id }, { artists: { $in: [targetUser._id] } }] } },
               { $lookup: { from: 'users', localField: 'artists', foreignField: '_id', as: 'artists' } },
               { $lookup: { from: 'albums', localField: 'album', foreignField: '_id', as: 'album' } },
               { $unwind: '$album' },
               { $sort: { createdAt: -1 } },
               { $limit: 5 },
               { $project: { name: 1, artists: { _id: 1, username: 1 }, duration: 1, album: { _id: 1, name: 1 }, coverArt: 1 } }
            ]),

            // Gets albums with the target user in artists
            Album.aggregate([
               { $match: { $or: [{ artists: targetUser._id }, { 'artists._id': targetUser._id }] } },
               { $lookup: { from: 'users', localField: 'artists', foreignField: '_id', as: 'artists' } },
               { $limit: 10 },
               { $project: { name: 1, artists: { _id: 1, username: 1 }, coverArt: 1 } }
            ]),

            // Gets the playlists owned by the target user that are public
            Playlist.aggregate([
               { $match: { $and: [{ public: true }, { owner: targetUser._id }] } },
               { $lookup: { from: 'tracks', localField: 'tracks', foreignField: '_id', as: 'trackDetails' } },
               { $addFields: { duration: { $sum: '$trackDetails.duration' }, trackCount: { $size: '$tracks' } } },
               { $lookup: { from: 'users', localField: 'owner', foreignField: '_id', as: 'owner' } },
               { $unwind: '$owner' },
               { $sort: { followers: -1, name: 1 } },
               { $limit: 10 },
               { $project: { name: 1, owner: { _id: 1, username: 1 }, coverArt: 1, followers: 1, tracks: '$trackCount', duration: 1 } }
            ])
         ]);
      } catch (error) {
         throw new SystemError(`Fetching user info failed: ${error.message}`);
      }

      targetUserInfo = targetUserInfo.map(transformDocument);
      popularTracks = popularTracks.map(transformDocument);
      recentTracks = recentTracks.map(transformDocument);
      albums = albums.map(transformDocument);
      playlists = playlists.map(transformDocument);

      try {
         await log(userId, constants.VIEWED_USER_PROFILE, targetUserId, constants.types.TARGET_USER);
      } catch (error) {
         throw new SystemError(`Fetching user info failed: ${error.message}`);
      }

      return {
         ...targetUserInfo[0],
         tracks: {
            popular: popularTracks,
            recent: recentTracks
         },
         albums,
         playlists
      };
   })();
};

export default getUserInfo;
