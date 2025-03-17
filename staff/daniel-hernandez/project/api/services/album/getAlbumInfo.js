import { User, Album } from '../../data/index.js';
import { CredentialError, NotFoundError, SystemError } from 'com/errors.js';
import transformDocument from '../../utils/transformDocument.js';
import validate from 'com/validation.js';
import constants from 'com/constants.js';
import log from '../log.js';

const getAlbumInfo = (userId, albumId) => {
   validate.inputs(userId, albumId);
   validate.objectId(userId);
   validate.objectId(albumId);

   return (async () => {
      let user, album;

      try {
         user = await User.findById(userId).lean();
      } catch (error) {
         throw new SystemError(`Fetching album info failed: ${error.message}`);
      }

      if (!user) {
         throw new CredentialError("User doesn't exist");
      }

      try {
         album = await Album.findById(albumId)
            .select('-__v -createdAt -updatedAt')
            .populate({
               path: 'artists',
               select: '_id username'
            })
            .populate({
               path: 'tracks',
               select: 'name artists duration album coverArt',
               populate: [
                  { path: 'artists', select: '_id username' },
                  { path: 'album', select: '_id name' }
               ]
            })
            .lean();
      } catch (error) {
         throw new SystemError(`Fetching album info failed: ${error.message}`);
      }

      if (!album) {
         throw new NotFoundError('Album not found');
      }

      const transformedDocument = transformDocument(album);

      try {
         await log(userId, constants.VIEWED_USER_CREATED_ALBUMS, albumId, constants.types.ALBUM);
      } catch (error) {
         throw new SystemError(`Album logging failed: ${error.message}`);
      }

      return transformedDocument;
   })();
};

export default getAlbumInfo;
