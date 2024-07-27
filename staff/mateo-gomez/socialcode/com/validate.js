import { ContentError, MatchError } from "./errors.js"

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/
const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{8,}$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ID_REGEX = /^[0-9a-z]+$/

function validateName(name, explain = 'name') {
    if (typeof name !== 'string' || !NAME_REGEX.test(name))
        throw new ContentError(`${explain} name is not valid`)
}

function validateSurname(surname, explain = 'surname') {
    if (typeof surname !== 'string' || !NAME_REGEX.test(surname))
        throw new ContentError(`${explain} is not valid`)
}

function validateUserName(username, explain = 'username') {
    if (typeof username !== 'string' || !USERNAME_REGEX.test(username))
        throw new ContentError(`${explain} is not valid`)
}

function validatePassword(password) {
    if (typeof password !== 'string' || !PASSWORD_REGEX.test(password))
        throw new ContentError('password is not valid')
}

function validatePasswordMatch(password, passwordRepeat) {
    if (password !== passwordRepeat) {
        throw new MatchError('password don\'t match')
    }
}

function validateCallback(callback) {
    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')
}

function validateEmail(email) {
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email))
        throw new ContentError('email is not valid')
}

function validateText(text, explain = 'text', maxLength = Infinity) {
    if (typeof text !== 'string' || !text.length || text.length > maxLength) {
        throw new ContentError(`${explain} is not valid`)
    }
}

function validateURL(url, explain = 'url') {
    if (typeof url !== 'string' || !url.startsWith('http')) {
        throw new ContentError(`${explain} is not valid`)
    }
}

function validateId(id, explain = 'id') {
    if (!ID_REGEX.test(id) || typeof id !== 'string')
        throw new ContentError(`${explain} is not valid`)
}

const validate = {
    name: validateName,
    surname: validateSurname,
    username: validateUserName,
    password: validatePassword,
    passwordMatch: validatePasswordMatch,
    callback: validateCallback,
    email: validateEmail,
    text: validateText,
    url: validateURL,
    id: validateId
}

export default validate