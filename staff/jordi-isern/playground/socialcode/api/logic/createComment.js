import data from '../data/index.js'
import validate from "com/validate.js";
import { MatchError, SystemError } from "com/errors.js";
import { ObjectId} from 'mongodb'

function createComment(username, postId, comment, callback) {
    validate.username(username)
    validate.id(postId)
    validate.text(comment, 'comment', 150)
    validate.callback(callback)

    data.users.findOne({username})
        .then(user =>{
            if(!user){
                callback(new MatchError('user not found'))

                return
            }
            data.posts.findOne({_id: new ObjectId(postId)})
                .then(post => {
                    if(!post) {
                        callback(new MatchError('post not found'))

                        return
                    }
                    post.comments.push({username, comment})
                    
                    data.posts.updateOne({_id: new ObjectId(postId)}, {$set: post})
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback( new SystemError(error.message)))

                
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default createComment