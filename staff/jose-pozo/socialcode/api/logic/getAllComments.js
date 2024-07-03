import data from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getAllComments = (username, postId, callback) => {
    validate.username(username)
    validate.id(postId, 'postId')
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {

            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            data.posts.comments.find({}).toArray()
                .then(posts => {
                    posts.forEach(post => {
                        post.id = post._id.toString()

                        delete post._id
                    })

                    callback(null, posts.reverse())
                })
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default getAllPosts