const logic = {}


const NAME_REGEX = /^[a-zA-z]/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_$%&=\[\]\{\}\<\>\(\)]).{8,}$/
const ID_REGEX = /^[0-9]+-[0-9]+$/

logic.registerUser = function (name, username, email, password, passwordRepeat, callback) {
    if (!NAME_REGEX.test(name)) {
        throw new ContentError('name is not valid')
    }

    if (!EMAIL_REGEX.test(email)) {
        throw new ContentError('email is not valid')
    }

    if (!USERNAME_REGEX.test(username)) {
        throw new ContentError('username is not valid')
    }

    if (!PASSWORD_REGEX.test(password)) {
        throw new ContentError('Your password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long. needs  ')
    }
    if (password !== passwordRepeat) {
        throw new MatchError('passwords dont\'t match')
    }

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 201) {
            callback(null)

            return
        }
        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }
    xhr.open('POST', 'http://localhost:8080/users')

    const body = { name, suername, email, username, password, passwordRepeat }

    const json = JSON.stringify(body)

    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send(json)
}

logic.loginUser = (username, password, callback) => {
    if (!USERNAME_REGEX.test(username)) {
        throw new ContentError('username is not valid')
    }

    if (!PASSWORD_REGEX.test(password)) {
        throw new ContentError('Your password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long. needs  ')
    }

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 200) {
            sessionStorage.username = username

            callback(null)

            return
        }
        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }
    xhr.open('POST', 'http://localhost:8080/user/auth')

    const body = { username, password }

    const json = JSON.stringify(body)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(json)
}


logic.isUserLoggedIn = () => !!sessionStorage.username

logic.logoutUser = () => delete sessionStorage.username


logic.getUserName = (callback) => {
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function')
    }
    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 200) {
            const name = JSON.parse(xhr.response)

            callback(null, name)

            return
        }
        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }
    xhr.open('GET', `http://localhost:8080/users/${sessionsStorage.username}`)

    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)
    xhr.send()
}

logic.getAllPosts = (callback) => {
    xhr.onload = () => {
        if (xhr.status === 200) {
            const post = JSON.parse(xhr.response)

            callback(null, post)

            return
        }
        const { error, message } = JSON.parse(xhr.response)

        const constructor = error[error]

        callback(new constructor(message))
    }

    xhr.open('GET', 'http://localhost:8080/posts')

    xhr.send()
}

logic.createPost = (title, image, description, callback) => {
    if (typeof title !== 'string' || !title.length || title.length > 50) {
        throw new ContentError('title is not valid')
    }
    if (typeof image !== 'string' || !image.startsWith('http')) {
        throw new ContentError('image is not valid')
    }
    if (typeof description !== 'string' || !description.length || title.length > 200) {
        throw new ContentError('description is not valid')
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function')
    }

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 201) {
            callback(null)

            return
        }
        const { error, message } = JSON.parse(xhr.response)

        const constructor = error[error]

        callback(new constructor(message))
    }

    xhr.open('POST', 'http://localhost:8080/posts')

    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)

    const body = {
        title,
        image,
        description
    }

    const json = JSON.stringify(body)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(json)
}

logic.getLoggedInUsername = () => sessionStorage.username

logic.deletePost = (postId, callback) => {
    if (!ID_REGEX.test(postId)) {
        throw new ContentError('postId is not valid')
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function')
    }

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 204) {
            callback(null)

            return
        }
        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.open('DELETE', `http://localhost:8080/posts/${postId}`)

    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)
    xhr.send()
}

