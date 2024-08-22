import { ContentError, MatchError } from './errors.js'

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{8,}$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PHONE_REGEX = /^[0-9]{9}$/
const ID_REGEX = /^[0-9a-z]+$/
const NUMBER_REGEX = /^(0|[1-9]\d*)(\.\d+)?$/

function validateName(name, explain = 'name') {
    if (typeof name !== 'string' || !NAME_REGEX.test(name))
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

function validatePhone(phone) {
    if (typeof phone !== 'string' || !PHONE_REGEX.test(phone))
        throw new ContentError('phone is not valid')
}

function validateUrl(url, explain = 'url') {
    if (typeof url !== 'string' || !url.startsWith('http'))
        throw new ContentError(`${explain} is not valid`)
}

function validateId(id, explain = 'id') {
    if ((typeof id !== 'string' || !ID_REGEX.test(id)) && id !== null)
        throw new ContentError(`${explain} is not valid`)
}

function validateRole(role, explain = 'role') {
    if (typeof role !== 'string' || role !== 'admin' && role !== 'user')
        throw new ContentError(`${explain} is not valid`)
}

function validateText(text, explain = 'text', maxLength = Infinity) {
    if (typeof text !== 'string' || !text.length || text.length > maxLength)
        throw new ContentError(`${explain} is not valid`)
}

function validateObservations(observations, explain = 'observations', maxLength = Infinity) {
    if (typeof observations !== 'string' || observations.length > maxLength)
        throw new ContentError(`${explain} is not valid`)
}

function validateStatus(status, explain = 'status') {
    if (typeof status !== 'string' || status !== 'toDo' && status !== 'inProgress' && status !== 'finished' && status !== 'canceled')
        throw new ContentError(`${explain} is not valid`)
}

function validatePriority(priority, explain = 'priority') {
    if (typeof priority !== 'string' || priority !== 'low' && priority !== 'medium' && priority !== 'high')
        throw new ContentError(`${explain} is not valid`)
}

function validateBoolean(boolean) {
    if (typeof boolean !== 'boolean')
        throw new ContentError('is not boolean')
}

function validateNumber(number, explain = 'number') {
    if (typeof number != 'number' || !NUMBER_REGEX.test(number) || number <= 0)
        throw new ContentError(`${explain} is not valid`)
}

const validate = {
    name: validateName,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    email: validateEmail,
    phone: validatePhone,
    url: validateUrl,
    role: validateRole,
    text: validateText,
    observations: validateObservations,
    status: validateStatus,
    priority: validatePriority,
    boolean: validateBoolean,
    id: validateId,
    number: validateNumber
}

export default validate