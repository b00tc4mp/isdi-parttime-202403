import { ObjectId } from 'mongodb'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const createComment = (username, textComment, postId, callback) => {
    validate.username(username)
    validate.text(textComment, 'textComment', 200)
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            data.posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) {
                        callback(new MatchError('post not found'))

                        return
                    }

                    const newComment = {
                        author: username,
                        textComment,
                        date: new Date,
                        likes: []
                    }

                    post.comments.push(newComment)

                    data.posts.updateOne({ _id: new ObjectId(postId) }, { $set: { comments: post.comments } })
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default createComment