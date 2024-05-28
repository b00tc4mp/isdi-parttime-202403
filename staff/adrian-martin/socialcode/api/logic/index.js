import data from '../data/index.js'
import { ContentError, DuplicityError, MatchError } from '../error.js'

const logic = {}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{8,}$/

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/

logic.registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
    if (!NAME_REGEX.test(name))
        throw new ContentError('name is not valid')

    if (!NAME_REGEX.test(surname))
        throw new ContentError('surname is not valid')

    if (!EMAIL_REGEX.test(email))
        throw new ContentError('email is not valid')

    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('password is not valid')

    if (password !== passwordRepeat)
        throw new MatchError('passwords don\'t match')

    data.findUser(user => user.email === email || user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (user) {
            callback(new DuplicityError('user already exists'))

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
}

logic.authenticateUser = (username, password, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('password is not valid')

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new MatchError('user not found'))

            return
        }
        if (user.password !== password) {
            callback(new MatchError('wrong password'))

            return
        }
        callback(null, user.username)
    })
}

logic.isUserLoggedIn = () => { !!sessionStorage.username }

logic.logoutUser = () => {
    delete sessionStorage.username
}

// logic.getAllUsers = callback => {
//     data.findUser( () => true, (error, users) => {
//         if(error){
//             callback(error)

//             return
//         }
//         callback(null, users)
//     })
// }

logic.getUsername = callback => {
    data.findUser(user => user.username, (error, posts) => {
        if (callback)

            if (error) {
                callback(error)

                return
            }
        callback(null, user)
    })
    return user.name
}

logic.getAllPosts = callback => {
    data.findPosts(() => true, (error, posts) => {

        if (error) {
            callback(error)

            return
        }
        callback(null, posts)
    })
}

logic.createPost = (username, image, description) => {
    if (typeof title !== 'string' || !title.length || title.length > 50) throw new ContentError('title is not valid')
    if (typeof image !== 'string' || !image.startsWith('http')) throw new ContentError('image is not valid')
    if (typeof description !== 'string' || !description.length || description.length > 200) throw new ContentError('description is not valid')

    const post = {
        id: Date.now(),
        author: username,
        title,
        image,
        description,
        date: new Date().toISOString()
    }

    data.insertPost(post)
}


logic.deletePost = id => data.deletePost(post => post.id === id)

export default logic