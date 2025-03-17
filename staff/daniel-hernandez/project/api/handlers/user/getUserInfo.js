import services from '../../services/index.js';

const getUserInfo = async (req, res, next) => {
   const { id: userId } = req.user;
   const { targetUserId } = req.params;

   try {
      const userInfo = await services.getUserInfo(userId, targetUserId);

      res.status(200).json(userInfo);
   } catch (error) {
      next(error);
   }
};

export default getUserInfo;
