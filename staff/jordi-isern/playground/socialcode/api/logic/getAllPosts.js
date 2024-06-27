import data from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getAllPosts = (username, callback) => {
    validate.username(username)
    validate.callback(callback)

    data.users.findOne({username})
        .then(user=> {
            if (!user) {
                callback(new MatchError('user not found'))
    
                return
            }

            data.post.find({}).toArray()
                .then(posts =>{
                    callback(null, posts)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => (callback(new SystemError(error.message))))
}

export default getAllPosts
