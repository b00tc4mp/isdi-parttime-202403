import data from "../data/index.js";
import { ContentError, DuplicityError, MatchError } from "../errors.js";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{6,}$/
const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/

const ID_REGEX = /^[0-9]+-[0-9]+$/
const logic = {}

logic.registerUser = (
    name,
    surname,
    email,
    username,
    password,
    repeatPassword,
    callback
) => {
    if (!USERNAME_REGEX.test(name))
        throw new ContentError('nombre no válido')

    if (!USERNAME_REGEX.test(surname))
        throw new ContentError('surname no válido')

    if (!EMAIL_REGEX.test(email))
        throw new ContentError('Esta cuenta de correo no es correcta')

    if (!USERNAME_REGEX.test(username))
        throw new ContentError('nombre de usuario no válido')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('La contraseña no cumple los criterios')

    if (password !== repeatPassword)
        throw new MatchError('los campos de contraseña no coinciden')

    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')

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

//Logic Login

logic.authenticateUser = (username, password, callback) => {
    if (!USERNAME_REGEX.test(username)) {
        throw new ContentError('username no válido')
    }
    if (!PASSWORD_REGEX.test(password)) {
        throw new ContentError('password no válido')
    }

    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function')
    }

    data.findUser(user => user.username === username, (err, user) => {
        if (err) {
            callback(err)
            return
        }

        if (!user) {
            callback(new MatchError('user not found'))
            return
        }

        if (user.password !== password) {
            callback(new MatchError('password incorrect'))
            return
        }

        callback(null)
    })
}

logic.getUserName = (userName, targetUsername, callback) => {
    if (!USERNAME_REGEX.test(userName))
        throw new ContentError('username is not valid')

    if (!USERNAME_REGEX.test(targetUsername))
        throw new ContentError('targetUsername is not valid')

    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')


    data.findUser(user => user.username === targetUsername, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new MatchError('user not found'))

            return
        }

        data.findUser(user => user.username === targetUsername, (error, targetUser) => {
            if (error) {
                callback(error)

                return
            }

            if (!targetUser) {
                callback(new MatchError('targetUser not found'))

                return
            }

            callback(null, targetUser.name)
        })
    })
}

logic.getAllPosts = callback => {
    data.findPosts(() => true, (error, posts) => {
        if (error) {
            callback(error)

            return
        }

        callback(null, posts.reverse())
    })
}

logic.createPost = (username, title, image, description, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')

    if (typeof title !== 'string' || !title.length || title.length > 50)
        throw new ContentError('title is not valid')

    if (typeof image !== 'string' || !image.startsWith('http'))
        throw new ContentError('image is not valid')

    if (typeof description !== 'string' || !description.length || description.length > 200)
        throw new ContentError('description is not valid')

    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new MatchError('user not found'))

            return
        }

        const post = {
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

logic.deletePost = (username, postId, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')

    if (!ID_REGEX.test(postId))
        throw new ContentError('postId is not valid')

    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new MatchError('user not found'))

            return
        }

        data.findPost(post => post.id === postId, (error, post) => {
            if (error) {
                callback(error)

                return
            }

            if (!post) {
                callback(new MatchError('post not found'))

                return
            }

            if (post.author !== username) {
                callback(new MatchError('post author does not match user'))

                return
            }

            data.deletePost(post => post.id === postId, error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })
    })
}

export default logic