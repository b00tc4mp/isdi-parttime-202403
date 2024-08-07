import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connect from './db/index.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';
const api = express();
const { PORT, MONGO_URI } = process.env;

api.use([express.json(), cors()]);

api.use('/api/v1/auth', routes.authRouter);
api.use('/api/v1/logs', routes.logRouter);
api.use(notFound);
api.use(errorHandler);

(async () => {
   try {
      await connect(MONGO_URI);
      api.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
   } catch (error) {
      console.error(error);
   }
})();
