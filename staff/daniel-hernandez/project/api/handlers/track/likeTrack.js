import services from '../../services/index.js';

const likeTrack = async (req, res, next) => {
   const { id: userId } = req.user;
   const { trackId } = req.params;

   try {
      await services.likeTrack(userId, trackId);
      res.status(204).send();
   } catch (error) {
      next(error);
   }
};

export default likeTrack;
