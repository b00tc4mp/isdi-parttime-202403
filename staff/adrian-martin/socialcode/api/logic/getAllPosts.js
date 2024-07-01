import data from '../data/index.js'
import { MatchError, SystemError } from 'com/error.js'
import validate from 'com/validate.js'



const getAllPosts = (username, callback) => { // page, limit
    validate.username(username)
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            data.posts.find({}).toArray()
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

    // data.findUser(user => user.username === username, (error, user) => {
    //     if (error) {
    //         callback(error)

    //         return
    //     }

    //     if (!user) {
    //         callback(new MatchError('user not found'))

    //         return
    //     }

    //     data.findPosts(() => true, (error, posts) => {

    //         if (error) {
    //             callback(error)

    //             return
    //         }
    //         callback(null, posts.reverse())
    //     })
    // })
}

export default getAllPosts