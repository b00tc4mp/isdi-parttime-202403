import services from '../../services/index.js';

const followPlaylist = async (req, res, next) => {
   const { id: userId } = req.user;
   const { playlistId } = req.params;
   try {
      await services.followPlaylist(userId, playlistId);
      res.status(204).send();
   } catch (error) {
      next(error);
   }
};

export default followPlaylist;
