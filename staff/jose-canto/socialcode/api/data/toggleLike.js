import fs from 'fs'
import errors from "com/errors.js"

const { SystemError } = errors

const toggleLike = (postId, username, callback) => {
  fs.readFile('./data/posts.json', 'utf8', (error, postsJson) => {
    if (error) {
      callback(new SystemError(error.message));
      return;
    }

    if (!postsJson) postsJson = '[]';

    const posts = JSON.parse(postsJson);

    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
      callback(new MatchError('Post not found'));
      return;
    }

    const selectedPost = posts[postIndex];

    if (!selectedPost.liked) {
      selectedPost.liked = [];
    }

    const userIndex = selectedPost.liked.indexOf(username);
    if (userIndex === -1) {
      selectedPost.liked.push(username);
      selectedPost.likes++
    } else {
      selectedPost.liked.splice(userIndex, 1);
      selectedPost.likes--
    }

    const newJson = JSON.stringify(posts);

    fs.writeFile('./data/posts.json', newJson, (error) => {
      if (error) {
        callback(new SystemError(error.message));
        return;
      }

      callback(null);
    });
  });
};

export default toggleLike