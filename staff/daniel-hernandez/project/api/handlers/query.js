import services from '../services/index.js';
import constants from 'com/constants.js';

const query = async (req, res, next) => {
   const { id: userId } = req.user;
   const { q: searchQuery, types = [], limit = constants.DEFAULT_LIMIT, page = 1 } = req.query;

   try {
      const queryTypes = Array.isArray(types) ? types : types ? types.split(',') : [];

      const queryResult = await services.query(userId, searchQuery, queryTypes, parseInt(limit), parseInt(page));

      res.status(200).json(queryResult);
   } catch (error) {
      next(error);
   }
};

export default query;
