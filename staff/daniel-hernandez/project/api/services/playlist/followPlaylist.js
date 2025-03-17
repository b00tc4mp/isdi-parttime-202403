import { User, Playlist } from '../../data/index.js';
import { CredentialError, NotFoundError, SystemError } from 'com/errors.js';
import validate from 'com/validation.js';
import constants from 'com/constants.js';
import log from '../log.js';

const followPlaylist = (userId, targetPlaylistId) => {
   validate.inputs(userId, targetPlaylistId);
   validate.objectId(userId);
   validate.objectId(targetPlaylistId);

   return (async () => {
      let user, playlist;

      try {
         user = await User.findById(userId).lean();
      } catch (error) {
         throw new SystemError(`Follow failed: ${error.message}`);
      }

      if (!user) {
         throw new CredentialError('User does not exist');
      }

      try {
         playlist = await Playlist.findById(targetPlaylistId).lean();
      } catch (error) {
         throw new SystemError(`Follow failed: ${error.message}`);
      }

      if (!playlist) {
         throw new NotFoundError('Playlist does not exist');
      }

      if (!playlist.public) {
         throw new CredentialError('Cannot follow a private playlist');
      }

      const following = user.followingPlaylists.some(playlistId => playlistId.toString() === targetPlaylistId);

      try {
         await Promise.all([
            User.updateOne(
               { _id: userId },
               following
                  ? { $pull: { followingPlaylists: targetPlaylistId } }
                  : { $addToSet: { followingPlaylists: targetPlaylistId } }
            ),
            Playlist.updateOne(
               { _id: targetPlaylistId },
               following ? { $inc: { followers: -1 } } : { $inc: { followers: 1 } }
            )
         ]);
      } catch (error) {
         throw new SystemError(`Failed to follow playlist: ${error.message}`);
      }

      try {
         await log(userId, following ? constants.UNFOLLOWED_PLAYLIST : constants.FOLLOWED_PLAYLIST, targetPlaylistId, constants.types.PLAYLIST);
      } catch (error) {
         throw new SystemError(`Playlist follow failed: ${error.message}`);
      }
   })();
};

export default followPlaylist;
