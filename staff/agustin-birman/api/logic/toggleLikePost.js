import data from '../data/index.js'
import { ContentError, MatchError, SystemError, } from 'com/errors.js'
import validate from 'com/validate.js'
import { ObjectId } from 'mongodb'


const toggleLikePost = (username, postId, callback) => {
    validate.username(username)
    validate.id(postId, 'postId')
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new ContentError('User not found'))

                return
            }

            data.posts.findOne({ _id: new Object(ObjectId) })
                .then(post => {
                    if (!post) {
                        callback(new MatchError('post not found'))

                        return
                    }

                    const index = post.likes.indexOf(username)

                    if (index < 0)
                        post.likes.push(username)
                    else
                        post.likes.splice(index, 1)


                    data.posts.updateOne({ _id: new ObjectId(postId) }, { $set: { likes: post.likes } })
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default toggleLikePost