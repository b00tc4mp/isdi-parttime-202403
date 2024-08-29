import { ContentError } from './errors.js'

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/
const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{5,}$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const ID_REGEX = /^[0-9a-z]+$/
const HOURS_REGEX = /^(?:[1-9][0-9]{0,3}|99999)$/
const RATING_REGEX = /^(?:[1-9]|10)$/


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

function validateEmail(email) {
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email))
        throw new ContentError('email is not valid')
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
    if (!ID_REGEX.test(id))
        throw new ContentError(`${explain} is not valid`)
}

function validateHours(number, explain = 'number') {
    if (typeof number !== 'number' || !HOURS_REGEX.test(String(number))) {
        throw new ContentError(`${explain} is not valid`);
    }
}

function validateRating(number, explain = 'number') {
    if (typeof number !== 'number' || !RATING_REGEX.test(String(number))) {
        throw new ContentError(`${explain} is not valid`);
    }
}

const validate = {
    name: validateName,
    username: validateUsername,
    password: validatePassword,
    email: validateEmail,
    text: validateText,
    url: validateUrl,
    id: validateId,
    hours: validateHours,
    rating: validateRating
}

export default validate