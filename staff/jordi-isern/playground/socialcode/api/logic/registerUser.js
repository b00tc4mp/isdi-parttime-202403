//LOGIC

import validate from 'com/validate.js'
import data from '../data/index.js'
import { ContentError, DuplicityError, MatchError} from "com/errors.js"
import { SystemError } from '../error.js'

const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordMatch(passwordRepeat)

    

    data.findUser(user => user.mail === email || user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (user) {
            callback(new DuplicityError('user already exists'))

            return
        }

        bcrypt.hash(password,8, (err, hash) => {  
            if(error) {
                callback(new SystemError(error. message))

                return
            }
            
            const newUser = {
            name: name,
            surname: surname,
            email: email,
            username: username,
            password: password
            }

            data.insertUser(newUser, error => {
            if (error) {
                callback(error)

                return
            }
            callback(null)
            })
        })    
    })
}

export default registerUser

