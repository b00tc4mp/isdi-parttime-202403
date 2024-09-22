import services from '../services/index.js';

const player = async (req, res, next) => {
   const { id: userId } = req.user;
   const { track: trackId } = req.body;

   try {
      const info = await services.player(userId, trackId);

      res.status(200).json(info);
   } catch (error) {
      next(error);
   }
};

export default player;
