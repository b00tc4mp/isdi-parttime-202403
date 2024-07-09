import {User, Post} from '../data/models/index.js'
import validate from "com/validate.js";
import { MatchError, SystemError } from "com/errors.js";

function createPostComment(username, postId, comment, callback) {
    validate.username(username)
    validate.id(postId)
    validate.text(comment, 'comment', 150)
    validate.callback(callback)

    User.findOne({username})
        .then(user =>{
            if(!user){
                callback(new MatchError('user not found'))

                return
            }
            Post.findOne({_id: new ObjectId(postId)})
                .then(post => {
                    if(!post) {
                        callback(new MatchError('post not found'))

                        return
                    }
                    post.comments.push({username, comment})
                    
                    Post.updateOne({_id: new ObjectId(postId)}, {$set: post})
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback( new SystemError(error.message)))

                
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default createPostComment