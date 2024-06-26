import { MatchError } from "com/errors.js"
import validate from "com/validate.js"
import data from "../data/index.js"

const toggleLike = (username, postId, callback) => {
    validate.username(username)
    validate.id(postId, "postId")
    validate.callback(callback)

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            return callback(error);
        }
        if (!user) {
            return callback(new MatchError('User not found'));
        }

        data.toggleLike(postId, username, (error) => {
            if (error) {
                return callback(error);
            }

            callback(null)

        })
    })
}

export default toggleLike