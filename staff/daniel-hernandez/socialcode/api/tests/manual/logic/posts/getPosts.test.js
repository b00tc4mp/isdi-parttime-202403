import 'dotenv/config';
import mongoose from 'mongoose';
import getPosts from '../../../../logic/posts/getPosts.js';

const { MONGO_TEST_URI } = process.env;

const testGetPosts = async () => {
   try {
      await mongoose.connect(MONGO_TEST_URI);
      console.log('connected to database');
   } catch (error) {
      console.error(`failed to connect to db: ${error}`);
   }

   try {
      const posts = await getPosts('6699fd4dda678b7dd6eead6f');
      console.log(posts);
   } catch (error) {
      console.error(error);
   } finally {
      await mongoose.disconnect();
      console.log('database connection closed');
   }
};

testGetPosts();
