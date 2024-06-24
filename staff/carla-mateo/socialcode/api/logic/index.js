import data from '../data/index.js'
import { ContentError, DuplicityError, MatchError } from '../errors.js'

const logic = {}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/

const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{4,}$/

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{2,}$/

const ID_REGEX = /^[0-9]+-[0-9]+$/

logic.registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
    if (!NAME_REGEX.test(name))
        throw new ContentError('❌ Name is not valid')

    if (!NAME_REGEX.test(surname))
        throw new ContentError('❌ Surname is not valid')

    if (!EMAIL_REGEX.test(email))
        throw new ContentError('❌ Email is not valid')

    if (!USERNAME_REGEX.test(username))
        throw new ContentError('❌ Username is not valid')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('❌ Password is not valid')

    if (!PASSWORD_REGEX.test(passwordRepeat))
        throw new ContentError('❌ Password repeat is not valid')

    if (password !== passwordRepeat)
        throw new MatchError('❌ Password don\'t match')


    data.findUser(user => user.email === email || user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }
        if (user) {
            callback(new DuplicityError('❌ User already exist'))

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
        throw new ContentError('❌ Username is not valid')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('❌ Password is not valid')

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new MatchError('❌ User not found'))

            return
        }


        if (user.password !== password) {
            callback(new MatchError('❌ Wrong password'))

            return
        }


        callback(null)
    })

}

logic.getUserName = (username, targetUsername, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')

    if (!USERNAME_REGEX.test(targetUsername))
        throw new ContentError('targetUsername is not valid')

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

logic.getAllPosts = (username, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')

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

        data.findPosts(() => true, (error, posts) => {
            if (error) {
                callback(error)

                return
            }

            callback(null, posts.reverse())
        })
    })
}

logic.createPost = (username, title, image, description, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('❌ Username is not valid')

    if (typeof title !== 'string' || !title.length || title.length > 50) throw new ContentError('❌ Title is not valid')

    if (typeof image !== 'string' || !image.startsWith('http')) throw new ContentError('❌ Image is not valid')

    if (typeof description !== 'string' || !description.length || description.length > 3000) throw new ContentError('❌ Description is not valid')

    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }
        if (!user) {
            callback(new MatchErrorError('❌ User not found'))

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
