import 'dotenv/config';
import mongoose from 'mongoose';
import createPost from '../../../../logic/posts/createPost.js';

const { MONGO_TEST_URI } = process.env;

const testCreatePost = async () => {
   try {
      await mongoose.connect(MONGO_TEST_URI);
      console.log('connected to database');
   } catch (error) {
      console.error(`failed to connect to db: ${error}`);
   }

   try {
      await createPost(
         '6699fd4dda678b7dd6eead6f',
         'this is a test post title',
         'https://imgs.search.brave.com/DHxbw6MrtUk2o-cyqdu0gDJwWPgHm2WH4yJzTSfCDvs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vaW1hZ2Vz/L2xhcmdlLXByZXZp/ZXdzLzllOS90ZXN0/LTEtMTQ4NjQ1OC5q/cGc_Zm10',
         'this is a test post description'
      );
      console.log('post created');
   } catch (error) {
      console.error(error);
   } finally {
      await mongoose.disconnect();
      console.log('database connection closed');
   }
};

testCreatePost();
