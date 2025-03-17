import { Playlist, User, Track, Log } from '../../data/index.js';
import { CredentialError, SystemError } from 'com/errors.js';
import transformDocument from '../../utils/transformDocument.js';
import shuffleArray from '../../utils/shuffleArray.js';
import validate from 'com/validation.js';
import constants from 'com/constants.js';
import log from '../log.js';

// TODO: add weighting system
// TODO: add collaborative filtering using followed users
// TODO: add pagination ?
const getCuratedLists = userId => {
   validate.inputs(userId);
   validate.objectId(userId);

   return (async () => {
      let user;

      try {
         user = await User.findById(userId);
      } catch (error) {
         throw new SystemError(`Getting curated lists failed: ${error.message}`);
      }

      if (!user) {
         throw new CredentialError('User does not exist');
      }

      let playedTracks, likedTracks, followedMixTracks, weeklyDiscovery;
      try {
         [playedTracks, likedTracks, followedMixTracks] = await Promise.all([
            // Most played tracks with track data and play counts
            Log.aggregate([
               { $match: { user: user._id, type: constants.PLAYED_TRACK } },
               { $group: { _id: '$track', playCount: { $sum: 1 } } },
               { $sort: { playCount: -1 } },
               { $limit: 50 },
               {
                  $lookup: {
                     from: 'tracks',
                     localField: '_id',
                     foreignField: '_id',
                     as: 'track'
                  }
               },
               { $unwind: '$track' },
               {
                  $lookup: {
                     from: 'users',
                     localField: 'track.artists',
                     foreignField: '_id',
                     as: 'artists'
                  }
               },
               {
                  $lookup: {
                     from: 'albums',
                     localField: 'track.album',
                     foreignField: '_id',
                     as: 'album'
                  }
               },
               { $addFields: { album: { $arrayElemAt: ['$album', 0] } } },
               {
                  $replaceRoot: {
                     newRoot: {
                        $mergeObjects: [
                           '$track',
                           {
                              playCount: '$playCount',
                              artists: '$artists',
                              album: '$album'
                           }
                        ]
                     }
                  }
               },
               {
                  $project: {
                     name: 1,
                     artists: {
                        $map: {
                           input: '$artists',
                           as: 'artist',
                           in: { _id: '$$artist._id', username: '$$artist.username' }
                        }
                     },
                     duration: 1,
                     album: {
                        _id: '$album._id',
                        name: '$album.name'
                     },
                     coverArt: 1,
                     playCount: 1
                  }
               }
            ]),

            // Liked tracks in original order
            Track.aggregate([
               { $match: { _id: { $in: user.likedTracks } } },
               {
                  $lookup: {
                     from: 'users',
                     localField: 'artists',
                     foreignField: '_id',
                     as: 'artists'
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
               { $addFields: { album: { $arrayElemAt: ['$album', 0] } } },
               {
                  $project: {
                     name: 1,
                     artists: {
                        $map: {
                           input: '$artists',
                           as: 'artist',
                           in: { _id: '$$artist._id', username: '$$artist.username' }
                        }
                     },
                     duration: 1,
                     album: {
                        _id: '$album._id',
                        name: '$album.name'
                     },
                     coverArt: 1
                  }
               }
            ]).then(tracks => tracks.sort((a, b) => user.likedTracks.indexOf(a._id) - user.likedTracks.indexOf(b._id))),

            // Followed mix
            Playlist.aggregate([
               { $match: { _id: { $in: user.followingPlaylists } } },
               { $unwind: '$tracks' },
               { $group: { _id: '$tracks' } },
               { $sample: { size: 100 } },
               {
                  $lookup: {
                     from: 'tracks',
                     let: { trackId: '$_id' },
                     pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$trackId'] } } },
                        {
                           $lookup: {
                              from: 'users',
                              localField: 'artists',
                              foreignField: '_id',
                              as: 'artists'
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
                        { $unwind: { path: '$album', preserveNullAndEmptyArrays: true } },
                        { $project: { __v: 0 } }
                     ],
                     as: 'track'
                  }
               },
               { $unwind: '$track' },
               { $replaceRoot: { newRoot: '$track' } },
               {
                  $project: {
                     name: 1,
                     artists: {
                        $map: {
                           input: '$artists',
                           as: 'artist',
                           in: { _id: '$$artist._id', username: '$$artist.username' }
                        }
                     },
                     duration: 1,
                     album: {
                        _id: '$album._id',
                        name: '$album.name'
                     },
                     coverArt: 1
                  }
               }
            ])
         ]);
      } catch (error) {
         throw new SystemError(`Failed to get curated lists: ${error.message}`);
      }

      // Weekly discovery with fallback
      try {
         const likedGenres = await Track.aggregate([{ $match: { _id: { $in: user.likedTracks } } }, { $group: { _id: '$genre', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 3 }]);
         const genreIds = likedGenres.map(g => g._id);

         // Main recommendation query
         weeklyDiscovery = await Track.aggregate([
            {
               $match: {
                  ...(genreIds.length > 0 && { genre: { $in: genreIds } }),
                  _id: { $nin: user.likedTracks }
               }
            },
            {
               $addFields: {
                  isRecent: {
                     $gt: ['$releaseDate', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)]
                  }
               }
            },
            { $sort: { isRecent: -1, releaseDate: -1 } },
            { $limit: 30 },
            {
               $lookup: {
                  from: 'users',
                  localField: 'artists',
                  foreignField: '_id',
                  as: 'artists'
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
            { $addFields: { album: { $arrayElemAt: ['$album', 0] } } },
            {
               $project: {
                  name: 1,
                  artists: {
                     $map: {
                        input: '$artists',
                        as: 'artist',
                        in: {
                           _id: '$$artist._id',
                           username: '$$artist.username'
                        }
                     }
                  },
                  duration: 1,
                  album: {
                     $cond: {
                        if: '$album',
                        then: { _id: '$album._id', name: '$album.name' },
                        else: null
                     }
                  },
                  coverArt: 1,
                  genre: 1,
                  releaseDate: 1
               }
            }
         ]);
      } catch (error) {
         throw new SystemError(`Discovery failed: ${error.message}`);
      }

      // If weekly discovery is too small because of a new user requery database
      if (weeklyDiscovery.length < 10) {
         try {
            weeklyDiscovery = await Track.aggregate([
               { $match: { _id: { $nin: user.likedTracks } } },
               { $sort: { releaseDate: -1 } },
               { $limit: 30 },
               {
                  $lookup: {
                     from: 'users',
                     localField: 'artists',
                     foreignField: '_id',
                     as: 'artists'
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
               { $addFields: { album: { $arrayElemAt: ['$album', 0] } } },
               {
                  $project: {
                     name: 1,
                     artists: {
                        $map: {
                           input: '$artists',
                           as: 'artist',
                           in: {
                              _id: '$$artist._id',
                              username: '$$artist.username'
                           }
                        }
                     },
                     duration: 1,
                     album: {
                        $cond: {
                           if: '$album',
                           then: { _id: '$album._id', name: '$album.name' },
                           else: null
                        }
                     },
                     coverArt: 1,
                     genre: 1,
                     releaseDate: 1
                  }
               }
            ]);
         } catch (error) {
            throw new SystemError(`Discovery failed: ${error.message}`);
         }
      }

      try {
         // TODO: In the future make some kind of playlist curation that is percistant to a certain time limit
         await log(userId, constants.VIEWED_CURATED_PLAYLISTS);
      } catch (error) {
         throw new SystemError(`Failed to get curated lists: ${error.message}`);
      }

      // Process into playlists
      return {
         mostPlayed: {
            name: 'Your top plays',
            tracks: transformDocument(playedTracks),
            description: "Songs you've played the most",
            context: { playCount: true }
         },
         likedTracks: {
            name: 'Your favorite tracks',
            tracks: transformDocument(likedTracks),
            description: 'All your favorite tracks'
         },
         followedMix: {
            name: 'Follow mix',
            tracks: transformDocument(shuffleArray(followedMixTracks)),
            description: 'A mix from playlists you follow'
         },
         discoverWeekly: {
            name: 'Discover Weekly',
            tracks: transformDocument(shuffleArray(weeklyDiscovery)),
            description: 'New recommendations for you'
         }
      };
   })();
};

export default getCuratedLists;
