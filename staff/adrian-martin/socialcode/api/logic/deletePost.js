import validate from 'com/validate.js'
import { Post, User } from '../data/index.js'
import { MatchError } from 'com/error.js'
import { ObjectId } from 'mongodb'

const deletePost = (username, postId, callback) => {
    validate.username(username)
    validate.id(postId, 'postId')
    validate.callback(callback)

   User.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            Post.findById(postId)
                .then(post => {
                    if (!post) {
                        callback(new MatchError('posts not found'))
        
                        return
                    }
        
                    if (post.author !== username) {
                        callback(new MatchError('post author does not match user'))
        
                        return
                    }

                    Post.deleteOne({_id: new ObjectId(postId)})
                        .then(() => callback(null))
                        .catch(error => callback(error))
                })
                .catch(error => callback(error))
        })
        .catch(error => console.error(error))


    // data.findUser(user => user.username === username, (error, user) => {
    //     if (error) {
    //         callback(error)

    //         return
    //     }

    //     if (!user) {
    //         callback(new MatchError('user not found'))

    //         return
    //     }

    //     data.findPost(post => post.id === postId, (error, post) => {
    //         if (error) {
    //             callback(error)

    //             return
    //         }

    //         if (!post) {
    //             callback(new MatchError('posts not found'))

    //             return
    //         }

    //         if (post.author !== username) {
    //             callback(new MatchError('post author does not match user'))

    //             return
    //         }

    //         data.deletePost(post => post.id === postId, error => {
    //             if (error) {
    //                 callback(error)

    //                 return
    //             }

    //             callback(null)
    //         })
    //     })
    // })
}

export default deletePost