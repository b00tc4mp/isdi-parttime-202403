import services from '../../services/index.js';

const getCuratedLists = async (req, res, next) => {
   const { id: userId } = req.user;

   try {
      const curatedLists = await services.getCuratedLists(userId);

      res.status(200).json(curatedLists);
   } catch (error) {
      next(error);
   }
};

export default getCuratedLists;
