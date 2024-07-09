import {User, Post} from '../data/models/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const deletePost = (userId, postId, callback) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.callback(callback)

    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))
    
                return
            }
            Post.findById(postId).lean()
                .then(post =>{
                    if (!post) {
                        callback(new MatchError('post not found'))
        
                        return
                    }
                    if (post.author !== userId) {
                        callback(new MatchError('post author does not match user'))
        
                        return
                    }

                    Posts.deleteOne({ _id: new ObjectId(postId)})
                        .then(()=>callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default deletePost