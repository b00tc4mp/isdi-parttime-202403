import { User, Post } from '../../data/index.js';
import { SystemError, NotFoundError } from 'com/errors.js';
import validate from 'com/validate.js';

const getPosts = userId => {
   validate.id(userId);

   return (async () => {
      let user, posts;

      try {
         user = await User.findById(userId).lean();
      } catch (error) {
         throw new SystemError(`failed to get posts: ${error.message}`);
      }

      if (!user) {
         throw new NotFoundError('user not found');
      }

      try {
         posts = await Post.find({}).populate('author', 'username').select('-__v').sort({ date: -1 }).lean();
      } catch (error) {
         throw new SystemError(`failed to get posts: ${error.message}`);
      }

      posts.forEach(post => {
         post.id = post._id.toString();

         delete post._id;

         if (post.author._id) {
            post.author.id = post.author._id.toString();

            delete post.author._id;
         }

         post.likes = post.likes.map(userObjectId => userObjectId.toString());
      });

      return posts;
   })();
};

export default getPosts;
