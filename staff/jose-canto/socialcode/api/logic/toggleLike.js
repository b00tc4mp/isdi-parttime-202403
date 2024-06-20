import data from "../data/index.js"
import { ContentError, MatchError } from "com/errors.js"
import validate from "com/validate.js"


const toggleLike = (username, postId, callback) => {
  validate.username(username)
  validate.validateId(postId, "postId")
  validate.callback(callback)

  data.findUser(user => user.username === username, (error, user) => {
    if (error) {
      return callback(error);
    }
    if (!user) {
      return callback(new MatchError('❌ User not found ❌'));
    }

    data.toggleLike(postId, username, (error, liked) => {
      if (error) {
        return callback(error);
      }
      callback(null, liked);
    });
  });
};

export default toggleLike;
