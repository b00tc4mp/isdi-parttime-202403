import services from '../services/index.js';

const log = async (req, res, next) => {
   const { id: userId } = req.user;
   const { type, targetId, targetType, query } = req.body;

   try {
      await services.log(userId, type, targetId, targetType, query);
      res.status(201).send();
   } catch (error) {
      next(error);
   }
};

export default log;
