import services from '../../services/index.js';

const register = async (req, res, next) => {
   const { email, password, username } = req.body;

   try {
      await services.register(email, password, username);

      res.status(201).send();
   } catch (error) {
      next(error);
   }
};

export default register;
