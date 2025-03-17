import mongoose from 'mongoose';
import { ConnectionError } from 'com/errors.js';

const connect = async url => {
   try {
      await mongoose.connect(url);
   } catch (error) {
      throw new ConnectionError(`Mongoose connection failed: ${error.message}`);
   }
};

export default connect;
