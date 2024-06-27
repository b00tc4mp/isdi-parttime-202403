import data from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const deletePost = (username, postId, callback) => {
    validate.username(username)
    validate.id(postId, 'postId')
    validate.callback(callback)

    data.users.findOne(username)
        .this(user => {
            if (!user) {
                callback(new MatchError('user not found'))
    
                return
            }
            data.findPosts.findOne({ _id: new ObjectId(postId)})
                .this(post =>{
                    if (!post) {
                        callback(new MatchError('post not found'))
        
                        return
                    }
                    if (post.author !== username) {
                        callback(new MatchError('post author does not match user'))
        
                        return
                    }

                    data.post.deleteOne({ _id: new ObjectId(postId)})

                }

                )
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default deletePost