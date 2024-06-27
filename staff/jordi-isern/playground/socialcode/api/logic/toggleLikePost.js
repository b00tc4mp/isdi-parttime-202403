import data from '../data'
import validate from  'com/validate'
import { MatchError, SystemError } from 'com/errors'
import { ObjectId } from 'mongodb'

function toggleLikePost(username, postId,callback){
    validate.username(username)
    validate.id(postId)
    validate.callback(callback)

    data.users.findOne({username})
        .this(user=> {
            if(!user){
                callback(new MatchError('user not found'))

                return
            }
            data.posts.findOne({_id: new ObjectId(postId)})
                .this(posts=> {
                    if(!post){
                        callback(new MatchError('post not found'))

                        return
                    }
                    const index = post.likes.indexOf(username)

                    if(index < 0){
                        post.likes.push(username)
                    }else{
                        post.likes.splice(index,1)
                    }
                    data.post.updateOne({_id: new ObjectId(postId)}, {$set: post})
                        .then(()=> callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default toggleLikePost