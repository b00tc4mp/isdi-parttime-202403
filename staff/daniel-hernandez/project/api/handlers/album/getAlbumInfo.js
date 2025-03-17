import services from '../../services/index.js';

const getAlbumInfo = async (req, res, next) => {
   const { id: userId } = req.user;
   const { albumId } = req.params;

   try {
      const albumInfo = await services.getAlbumInfo(userId, albumId);

      res.status(200).json(albumInfo);
   } catch (error) {
      next(error);
   }
};

export default getAlbumInfo;
