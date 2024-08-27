import { ContentError, MatchError } from "./errors.js"

const NAME_REGEX = /^[\w-]+$/
const USERNAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{4,}$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const ID_REGEX = /^[0-9a-z]+$/
const AVATAR_REGEX = /^[a-zA-Z0-9-_\/]+\.(jpg|jpeg|png|gif)$/

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
        throw new MatchError('password don\'t match')
}

function validateEmail(email) {
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email))
        throw new ContentError('email is not valid')
}

function validateCallback(callback) {
    if (typeof callback !== 'function')
        throw new TypeError('Callback is not a fnction')
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
    if (typeof id !== "string" || !ID_REGEX.test(id)) {
        throw new ContentError(`${explain} is not valid`)
    }
}

function validateIdAssignee(idAssignee, explain = 'id') {
    if (idAssignee === null) return

    if (typeof idAssignee !== "string" || ID_REGEX.test(idAssignee)) {
        throw new ContentError(`${explain} is not valid`)
    }
}

function validateAvatar(avatar, explain = 'avatar') {
    if (typeof avatar !== 'string' || !AVATAR_REGEX.test(avatar)) {
        throw new ContentError(`${explain} is not valid`);
    }

    if (!avatar.startsWith('avatars/')) {
        throw new ContentError(`${explain} is not valid`);
    }
}

function validateDate(date, explain = 'date') {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new ContentError(`${explain} is not valid`);
    }
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
    idAssignee: validateIdAssignee,
    avatar: validateAvatar,
    date: validateDate
}

export default validate