import 'dotenv/config';
import express from 'express';
import connect from './db/index.js';
import cors from 'cors';
const api = express();
const { PORT, MONGO_URI } = process.env;

api.use([express.json(), cors()]);

(async () => {
   try {
      await connect(MONGO_URI);
      api.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
   } catch (error) {
      console.error(error);
   }
})();
