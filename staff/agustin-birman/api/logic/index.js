import data from '../data/index.js'
import { ContentError, SystemError, MatchError, DuplicityError } from '../errors.js'

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
            callback(new SystemError(error.message))

            return
        }

        if (user) {
            callback(new DuplicityError('user already exists'))

            return
        }

        const newUser = {
            name,
            surname,
            email,
            username,
            password
        }

        data.insertUser(newUser, error => {
            if (error) {
                callback(new SystemError(error.message))

                return
            }

            callback(null, newUser)
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

        callback(null)
    })
}

logic.getAllposts = callback => {
    data.findPosts(() => true, (error, posts) => {
        if (error) {
            callback(error)

            return
        }

        callback(null, posts.reverse())
    })
}

logic.createPost = (username, image, description) => {
    if (!USERNAME_REGEX.test(username)) throw new ContentError('username is not valid')
    if (typeof title !== 'string' || !title.length || title.length > 50) throw new ContentError('title is not valid')
    if (typeof image !== 'string' || !image.startsWith('http')) throw new ContentError('image is not valid')
    if (typeof description !== 'string' || !description.length || description.length > 200) throw new ContentError('description is not valid')

    //No entendi la razon de esta parde del codigo, ya que el usuario ya existe, pero manu lo hizo asi para comprobar el usuario
    data.findUser(user => user.username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new MatchError('user not found'))

            return
        }

        const newPost = {
            author: username,
            title,
            image,
            description,
            date: new Date().toISOString()
        }

        data.insertPost(post, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}

logic.deletePost = id => data.deletePost(post => post.id === id)

export default logic