import data from '../data/index.js'
import { ContentError, DuplicityError, MatchError } from '../errors.js'

const logic = {}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/

const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{4,}$/

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{2,}$/

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

logic.getAllPosts = () => {
    const posts = data.findPosts(() => true)

    return posts.reverse()
}

logic.createPost = (username, title, image, description) => {
    if (typeof title !== 'string' || !title.length || title.length > 50) throw new ContentError('❌ Title is not valid')
    if (typeof image !== 'string' || !image.startsWith('http')) throw new ContentError('❌ Image is not valid')
    if (typeof description !== 'string' || !description.length || description.length > 3000) throw new ContentError('❌ Description is not valid')

    const post = {
        author: username,
        title,
        image,
        description,
        date: utils.getStringInDateFormat()
    }

    data.insertPost(post)
}

logic.deletePost = id => data.deletePost(post => post.id === id)

export default logic
