import {User, Post} from '../data/models/index.js'
import validate from  'com/validate.js'
import { MatchError, SystemError } from 'com/errors.js'

function toggleLikePost(userId, postId,callback){
    validate.id(userId, 'userID')
    validate.id(postId, 'postId')
    validate.callback(callback)

    User.findById(userId)
        .then(user=> {
            if(!user){
                callback(new MatchError('user not found'))

                return
            }
            Post.findById(postId)
                .then(post=> {
                    if(!post){
                        callback(new MatchError('post not found'))

                        return
                    }
                    const index = post.likes.indexOf(userId)

                    if(index < 0){
                        post.likes.push(userId)
                    }else{
                        post.likes.splice(index,1)
                    }
                    post.save()
                        .then(()=> callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default toggleLikePost