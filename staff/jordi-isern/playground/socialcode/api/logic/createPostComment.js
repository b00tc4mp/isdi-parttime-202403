import {User, Post} from '../data/models/index.js'
import validate from "com/validate.js";
import { MatchError, NotFoundError, SystemError } from "com/errors.js";

function createPostComment(userId, postId, comment) {
    validate.id(userId)
    validate.id(postId)
    validate.text(comment, 'comment', 150)

    return User.findById(userId).lean()
        .catch(error => {throw new SystemError(error.message)})
        .then(user => {
            if(!user){throw new NotFoundError('User not found')}

            return Post.findById(postId)
                .catch(error => {throw new SystemError(error.message) })
                .then(post => {
                    if(!post) {
                        throw new NotFoundError('Post not found')
                    }

                    return Post.findByIdAndUpdate({_id: post.id},{
                        push: {comments: {author: user._id, comment: comment}}
                    })
                        .catch(error => {throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default createPostComment