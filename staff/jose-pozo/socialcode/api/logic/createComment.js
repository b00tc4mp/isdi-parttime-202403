import data from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

import { ObjectId } from 'mongodb'

const createComment = (username, postId, description, callback) => {
    validate.username(username)
    validate.id(postId, 'postId')
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

                    console.log(post._id)

                    const comment = {
                        author: username,
                        description,
                        date: new Date().toLocaleDateString(),
                        likes: []
                    }

                    data.posts.updateOne({ _id: new ObjectId(postId) }, { $push: { comments: { comment } } })
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })

                .catch(error => callback(new SystemError(error.message)))


        })
        .catch(error => callback(new SystemError(error.message)))



}

export default createComment