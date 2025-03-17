import services from '../../services/index.js';

const getPlaylistInfo = async (req, res, next) => {
   const { id: userId } = req.user;
   const { playlistId } = req.params;

   try {
      const playlistInfo = await services.getPlaylistInfo(userId, playlistId);

      res.status(200).json(playlistInfo);
   } catch (error) {
      next(error);
   }
};

export default getPlaylistInfo;
