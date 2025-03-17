import services from '../../services/index.js';

const followUser = async (req, res, next) => {
   const { id: userId } = req.user;
   const { targetUserId } = req.params;

   try {
      await services.followUser(userId, targetUserId);
      res.status(204).send();
   } catch (error) {
      next(error);
   }
};

export default followUser;
