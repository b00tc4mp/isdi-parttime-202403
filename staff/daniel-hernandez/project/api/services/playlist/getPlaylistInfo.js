import { User, Playlist } from '../../data/index.js';
import { CredentialError, NotFoundError, SystemError } from 'com/errors.js';
import transformDocument from '../../utils/transformDocument.js';
import validate from 'com/validation.js';
import constants from 'com/constants.js';
import log from '../log.js';

const getPlaylistInfo = (userId, playlistId) => {
   validate.inputs(userId, playlistId);
   validate.objectId(userId);
   validate.objectId(playlistId);

   return (async () => {
      let user, playlist;

      try {
         user = await User.findById(userId).lean();
      } catch (error) {
         throw new SystemError(`Fetching playlist info failed: ${error.message}`);
      }

      if (!user) {
         throw new CredentialError("User doesn't exist");
      }

      try {
         playlist = await Playlist.findOne({ public: true, _id: playlistId })
            .select('-__v -createdAt -updatedAt')
            .populate({
               path: 'tracks',
               select: 'name artists duration album coverArt',
               populate: [
                  { path: 'artists', select: '_id username' },
                  { path: 'album', select: '_id name' }
               ]
            })
            .populate({
               path: 'owner',
               select: '_id username profileImage'
            })
            .lean();
      } catch (error) {
         throw new SystemError(`Fetching playlist info failed: ${error.message}`);
      }

      if (!playlist) {
         throw new NotFoundError('Playlist not found or not public');
      }

      const isFollowed = user.followingPlaylists.some(followedId => followedId.equals(playlist._id));

      // Transform the playlist document
      const transformedDocument = transformDocument(playlist);
      transformedDocument.isFollowed = isFollowed;

      try {
         await log(userId, constants.VIEWED_USER_PLAYLISTS, playlistId, constants.types.PLAYLIST);
      } catch (error) {
         throw new SystemError(`Playlist logging failed: ${error.message}`);
      }

      return transformedDocument;
   })();
};

export default getPlaylistInfo;
