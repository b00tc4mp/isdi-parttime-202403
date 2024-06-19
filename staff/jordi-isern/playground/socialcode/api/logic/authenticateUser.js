//LOGIC

import data from '../data/index.js'
import { ContentError, DuplicityError, MatchError } from "../error.js"

const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w$%&=\[\]\{\}\<\>\(\)]{8,}$/

const authenticateUser = (username, password, callback) => {
    if(!USERNAME_REGEX.test(username)){
        throw new ContentError('username is not valid')
    }
    
    if(!PASSWORD_REGEX.test(password)){
        throw new ContentError('password is not valid')
    }

    if(typeof callback !== 'function'){
        throw new TypeError('callback is no a function')
    }

    data.findUser(user => user.username === username, (error , user) =>{
        if(error) {
            callback(error)

            return
        }
        if(!user) {
            callback(new MatchError('wrong password'))

            return
        }

        callback(null)
    })
}

export default authenticateUser

