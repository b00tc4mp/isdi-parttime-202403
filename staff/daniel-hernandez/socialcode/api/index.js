import 'dotenv/config';
import express from 'express';
import connectDB from './db/connect.js';
import errorHandler from './middleware/error-handler.js';
// TODO: configure cors
import cors from 'cors';
const api = express();
const { PORT, MONGO_URI } = process.env;

// TODO: async wrapper
//middleware
api.use([express.static('public'), express.json(), cors()]);

// routes
import router from './routes/index.js';
import notFound from './middleware/not-found.js';

api.use('/users', router.userRouter);
api.use('/posts', router.postRouter);
api.use(notFound);
api.use(errorHandler);

(async () => {
   try {
      await connectDB(MONGO_URI);

      api.listen(PORT, () => console.log(`server listening on port: ${PORT}...`));
   } catch (error) {
      console.error(error);
   }
})();
