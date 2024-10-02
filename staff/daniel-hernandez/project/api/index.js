import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connect from './db/index.js';
import routes from './routes/index.js';
import { errorHandler, notFound, verifyToken } from './middleware/index.js';

const api = express();
const { PORT, MONGO_URI } = process.env;

api.use([express.json(), cors()]);

api.use('/api/v1/auth', routes.authRouter);
api.use('/api/v1/logs', verifyToken, routes.logRouter);
api.use('/api/v1/search', verifyToken, routes.queryRouter);
api.use('/api/v1/stream', verifyToken, routes.streamRouter);
api.use('/api/v1/player', verifyToken, routes.playerRouter);

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
