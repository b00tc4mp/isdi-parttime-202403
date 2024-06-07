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

    if (password !== passwordRepeat)
        throw new MatchError('❌ Password don\'t match')

    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')

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

    const body = { name, surname, email, username, password, passwordRepeat }

    const json = JSON.stringify(body)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(json)

}

logic.loginUser = (username, password, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('❌ Username is not valid')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('❌ Password is not valid')

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

    xhr.open('POST', 'http://localhost:8080/users/auth')

    const body = { username, password }

    const json = JSON.stringify(body)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(json)
}

logic.isUserLoggedIn = () => !!sessionStorage.username

logic.logoutUser = () => delete sessionStorage.username

logic.getUserName = () => {
    const user = data.findUser(user => user.username === sessionStorage.username)

    return user.name
}

logic.getAllPosts = () => {
    const posts = data.findPosts(() => true)

    return posts.reverse()
}

logic.createPost = (title, image, description) => {
    if (typeof title !== 'string' || !title.length || title.length > 50) throw new ContentError('❌ Title is not valid')
    if (typeof image !== 'string' || !image.startsWith('http')) throw new ContentError('❌ Image is not valid')
    if (typeof description !== 'string' || !description.length || description.length > 3000) throw new ContentError('❌ Description is not valid')

    const post = {
        author: sessionStorage.username,
        title,
        image,
        description,
        date: utils.getStringInDateFormat()
    }

    data.insertPost(post)
}

logic.getLoggedInUsername = () => sessionStorage.username

logic.deletePost = id => data.deletePost(post => post.id === id)
