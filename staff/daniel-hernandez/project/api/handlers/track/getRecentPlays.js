import services from '../../services/index.js';

const getRecentPlays = async (req, res, next) => {
   const { id: userId } = req.user;

   try {
      const recentPlays = await services.getRecentPlays(userId);

      res.status(200).json(recentPlays);
   } catch (error) {
      next(error);
   }
};

export default getRecentPlays;
