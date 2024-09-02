import { ContentError, MatchError } from './errors.js'

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/
const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{4,}$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const ID_REGEX = /^[0-9a-z]+$/
const PHONE_REGEX = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const TIME_REGEX = /^\d{2}:\d{2}$/

function validateName(name, explain = 'name') {
    if (typeof name !== 'string' || !NAME_REGEX.test(name))
        throw new ContentError(`${explain} is not valid`)
}

function validateUsername(username, explain = 'username') {
    if (typeof username !== 'string' || !USERNAME_REGEX.test(username))
        throw new ContentError(`${explain} is not valid`)
}

function validatePassword(password) {
    if (typeof password !== 'string' || !PASSWORD_REGEX.test(password))
        throw new ContentError('password is not valid')
}

function validatePasswordsMatch(password, passwordRepeat) {
    if (password !== passwordRepeat)
        throw new MatchError('passwords don\'t match')
}

function validateEmail(email) {
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email))
        throw new ContentError('email is not valid')
}

function validateCallback(callback) {
    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')
}

function validateText(text, explain = 'text', maxLength = Infinity) {
    if (typeof text !== 'string' || !text.length || text.length > maxLength)
        throw new ContentError(`${explain} is not valid`)
}

function validateUrl(url, explain = 'url') {
    if (typeof url !== 'string' || !url.startsWith('http'))
        throw new ContentError(`${explain} is not valid`)
}

function validateId(id, explain = 'id') {
    if (typeof id !== 'string' || !ID_REGEX.test(id))
        throw new ContentError(`${explain} is not valid`)
}

function validatePhone(phone, explain = 'phone') {
    if (typeof phone !== 'string' || !PHONE_REGEX.test(phone))
        throw new ContentError(`${explain} is not valid`)
}

function validateNumber(number, explain = 'number') {
    if (typeof number !== 'number')
        throw new ContentError(`${explain} is not valid`)
}

function validateDate(date, explain = 'date') {
    if (typeof date !== 'string' || !DATE_REGEX.test(date))
        throw new ContentError(`${explain} is not valid`)
}

function validateTime(time, explain = 'time') {
    if (typeof time !== 'string' || !TIME_REGEX.test(time))
        throw new ContentError(`${explain} is not valid`)
}

const validate = {
    name: validateName,
    username: validateUsername,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    email: validateEmail,
    callback: validateCallback,
    text: validateText,
    url: validateUrl,
    id: validateId,
    phone: validatePhone,
    number: validateNumber,
    date: validateDate,
    time: validateTime
}

export default validate