import errors from '../errors'
const { ContentError, MatchError } = errors

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{8,}$/

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/

const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {

    console.log(`Validating name: "${name}"`);


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


export default registerUser