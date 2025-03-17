import services from '../../services/index.js';

const checkEmail = async (req, res, next) => {
   const { email } = req.body;

   try {
      const bool = await services.checkEmail(email);

      res.json({ bool });
   } catch (error) {
      next(error);
   }
};

export default checkEmail;
