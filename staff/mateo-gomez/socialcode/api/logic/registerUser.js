import data from '../data/index.js'
import { DuplicityError } from 'com/errors.js'
import validate from 'com/validate.js'


const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
    //Input validation
    validate.name(name)
    validate.surname(surname)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordMatch(password, passwordRepeat)
    validate.callback(callback)

    data.findUser(user => user.email.toLowerCase() === email.toLowerCase() || user.username.toLowerCase() === username.toLowerCase(), (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (user) {
            callback(new DuplicityError('username already exists'))

            return
        }
        const newUser = {
            name: name,
            surname: surname,
            email: email,
            username: username,
            password: password,
        }

        data.insertUser(newUser, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })


}



export default registerUser

