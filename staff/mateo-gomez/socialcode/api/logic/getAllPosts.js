import validate from 'com/validate.js'
import data from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'


const getAllPosts = (username, callback) => {
    validate.username(username)
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            data.posts.find({}).sort({ date: -1 }).toArray()
                .then(posts => {
                    posts.forEach(post => {
                        post.id = post._id.toString()

                        delete post._id
                    })

                    callback(null, posts)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))

    //Antes de mongo
    /* data.findUser(user => user.username === username, (error, user) => {
         if (error) {
             callback(new SystemError(error.message))
 
             return
         }
 
         if (!user) {
             callback(new MatchError('user not found'))
 
             return
         }
 
 
 
         data.findPosts(() => true, (error, posts) => {
             if (error) {
                 callback(new SystemError(error.message))
 
                 return
             }
 
             callback(null, posts.reverse())
         })
 
     })*/
}

export default getAllPosts

