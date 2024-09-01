import { User, Track, Playlist, Album } from '../data/index.js';
import { CredentialError, SystemError } from 'com/errors.js';
import validate from 'com/validation.js';
import constants from 'com/constants.js';
import log from './log.js';
import transformDocument from '../utils/transformDocument.js';
// wimp womp flimp flomp gl maintainers (me) :3

// TODO: This is the minimum working product query logic. This will get improved
// TODO: Consider adding popularity metric
const query = (userId, query, types = [], limit = constants.DEFAULT_LIMIT, page = 1) => {
   validate.inputs(userId, query, types, limit, page);
   validate.objectId(userId);
   validate.query(query);
   validate.queryTypes(types);
   validate.limit(limit);
   validate.page(page);

   return (async () => {
      let user;

      try {
         user = await User.findById(userId).lean();
      } catch (error) {
         throw new SystemError(`Query failed: ${error.message}`);
      }

      if (!user) {
         throw new CredentialError("User doesn't exist");
      }

      const { likedTracks, likedAlbums, followingPlaylists, following } = user;
      const skip = (page - 1) * limit;

      const queryTypes = types.length === 0 ? [...constants.queryTypes] : types;

      // Normalize query: remove spaces, special characters, and convert to lowercase
      const normalizedQuery = query.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      if (!normalizedQuery) {
         const emptyResult = queryTypes.reduce((acc, type) => {
            acc[type + 's'] = [];
            return acc;
         }, {});

         try {
            await log(userId, constants.SEARCHED, null, null, query);
         } catch (error) {
            throw new SystemError(`Query failed: ${error.message}`);
         }

         return types.length === 0 ? { results: [] } : emptyResult;
      }

      const regexQuery = { $regex: new RegExp(normalizedQuery.split('').join('.*'), 'i') };

      let users = [],
         tracks = [],
         playlists = [],
         albums = [];

      try {
         [users, tracks, playlists, albums] = await Promise.all([
            queryTypes.includes('user')
               ? User.aggregate([
                    { $match: { username: regexQuery } },
                    {
                       $addFields: {
                          relevance: {
                             $add: [
                                { $indexOfCP: ['$username', normalizedQuery] },
                                {
                                   $cond: {
                                      if: { $in: ['$_id', following] },
                                      then: -10, // Boost relevance for followed users
                                      else: 0
                                   }
                                }
                             ]
                          },
                          followersCount: { $size: '$followers' }
                       }
                    },
                    { $sort: { relevance: 1, username: 1 } },
                    { $skip: skip },
                    { $limit: limit },
                    {
                       $project: {
                          username: 1,
                          profileImage: 1,
                          followers: { total: { $convert: { input: '$followersCount', to: 'int' } } }
                       }
                    }
                 ])
               : [],
            queryTypes.includes('track')
               ? Track.aggregate([
                    {
                       $match: {
                          $or: [
                             { name: regexQuery },
                             {
                                artists: {
                                   $in: await User.find({ username: regexQuery }).distinct('_id')
                                }
                             }
                          ]
                       }
                    },
                    {
                       $addFields: {
                          relevance: {
                             $add: [
                                { $indexOfCP: ['$name', normalizedQuery] },
                                {
                                   $cond: {
                                      if: { $in: ['$_id', likedTracks] },
                                      then: -20, // Boost relevance for liked tracks
                                      else: 0
                                   }
                                },
                                {
                                   $cond: {
                                      if: {
                                         $in: ['$album', await Album.find({ name: regexQuery }).distinct('_id')]
                                      },
                                      then: -15, // Boost relevance for tracks within the most relevant album
                                      else: 0
                                   }
                                }
                             ]
                          }
                       }
                    },
                    {
                       $lookup: {
                          from: 'albums',
                          localField: 'album',
                          foreignField: '_id',
                          as: 'album'
                       }
                    },
                    { $unwind: '$album' },
                    {
                       $lookup: {
                          from: 'users',
                          localField: 'artists',
                          foreignField: '_id',
                          as: 'artists'
                       }
                    },
                    { $sort: { relevance: 1, name: 1 } },
                    { $skip: skip },
                    { $limit: limit },
                    {
                       $project: {
                          name: 1,
                          artists: { _id: 1, username: 1 },
                          duration: 1,
                          album: { _id: 1, name: 1 },
                          coverArt: 1
                       }
                    }
                 ])
               : [],
            queryTypes.includes('playlist')
               ? Playlist.aggregate([
                    {
                       $match: {
                          $and: [
                             { public: true },
                             {
                                $or: [
                                   { name: regexQuery },
                                   { 'tracks.name': regexQuery }, // Match by track names within the playlist
                                   { 'tracks.artists.username': regexQuery }
                                ]
                             }
                          ]
                       }
                    },
                    {
                       $lookup: {
                          from: 'users',
                          localField: 'owner',
                          foreignField: '_id',
                          as: 'owner'
                       }
                    },
                    { $unwind: '$owner' },
                    {
                       $addFields: {
                          relevance: {
                             $add: [
                                { $indexOfCP: ['$name', normalizedQuery] },
                                {
                                   $cond: {
                                      if: { $in: ['$_id', followingPlaylists] },
                                      then: -10, // Boost relevance for liked playlists
                                      else: 0
                                   }
                                }
                             ]
                          }
                       }
                    },
                    { $sort: { relevance: 1, name: 1 } },
                    { $skip: skip },
                    { $limit: limit },
                    {
                       $project: {
                          name: 1,
                          owner: { _id: 1, username: 1 },
                          coverArt: 1
                       }
                    }
                 ])
               : [],
            queryTypes.includes('album')
               ? Album.aggregate([
                    {
                       $match: {
                          $or: [
                             { name: regexQuery },
                             { 'artists.username': regexQuery } // Match by artist names within the album
                          ]
                       }
                    },
                    {
                       $lookup: {
                          from: 'users',
                          localField: 'artists',
                          foreignField: '_id',
                          as: 'artists'
                       }
                    },
                    {
                       $addFields: {
                          relevance: {
                             $add: [
                                { $indexOfCP: ['$name', normalizedQuery] },
                                {
                                   $cond: {
                                      if: { $in: ['$_id', likedAlbums] },
                                      then: -10, // Boost relevance for liked albums
                                      else: 0
                                   }
                                }
                             ]
                          }
                       }
                    },
                    { $sort: { relevance: 1, name: 1 } },
                    { $skip: skip },
                    { $limit: limit },
                    {
                       $project: {
                          name: 1,
                          artists: { _id: 1, username: 1 },
                          coverArt: 1
                       }
                    }
                 ])
               : []
         ]);
      } catch (error) {
         throw new SystemError(`Query failed: ${error.message}`);
      }

      users = users.map(transformDocument);
      tracks = tracks.map(transformDocument);
      playlists = playlists.map(transformDocument);
      albums = albums.map(transformDocument);

      try {
         await log(userId, constants.SEARCHED, null, null, query);
      } catch (error) {
         throw new SystemError(`Query logging failed: ${error.message}`);
      }

      const result = {
         ...(queryTypes.includes('user') && { users }),
         ...(queryTypes.includes('track') && { tracks }),
         ...(queryTypes.includes('playlist') && { playlists }),
         ...(queryTypes.includes('album') && { albums })
      };

      return types.length === 0 ? { results: [...users, ...tracks, ...playlists, ...albums] } : result;
   })();
};

export default query;
