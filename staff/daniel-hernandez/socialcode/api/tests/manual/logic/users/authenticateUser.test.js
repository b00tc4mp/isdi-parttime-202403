import 'dotenv/config';
import mongoose from 'mongoose';
import authenticateUser from '../../../../logic/users/authenticateUser.js';

const { MONGO_TEST_URI } = process.env;

const testAuthenticateUser = async () => {
   try {
      await mongoose.connect(MONGO_TEST_URI);
      console.log('connected to database');
   } catch (error) {
      console.error(`failed to connect to db: ${error}`);
   }

   try {
      const userId = await authenticateUser('tester', '123123123');
      console.log('user authenticated', userId);
   } catch (error) {
      console.error(error);
   } finally {
      await mongoose.disconnect();
      console.log('database connection closed');
   }
};

testAuthenticateUser();
