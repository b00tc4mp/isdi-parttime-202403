import validate from 'com/validate.js'
import data from '../data/index.js'
import { MatchError } from "com/errors.js"


const deletePost = ( username, postId, callback) => {
    validate.username(username)
    validate.id(postId)
    validate.callback(callback)

    

    data.findUser(use4r => user.username === username, (error , user) => {
        if(error) {
            callback(error)

            return
        }
        if(!user) {
            callback (new MatchError('user not found'))

            return
        }
        data.findPost(post => post.id === postId, (error , post) => {
            if(error) {
                callback(error)

                return
            }
            if (!post) {
                callback( new MatchError('Post not found'))

                return
            }
            if(post.author !== username) {
                callback(new MatchError('post author does not match user'))

                return
            }
            data.deletePost(post => post.id === postId, error => {
                if(error){
                    callback(error)

                    return
                }
                callback(null)
            })
        })
    })

}

export default deletePost

