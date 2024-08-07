import { ContentError, CredentialsError, MatchError } from './errors.js'

const NAME_REGEX = /^[a-zA-Z ]+$/
// const ARTISTIC_NAME_REGEX = /^[a-zA-Z ]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{3,}$/
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const ID_REGEX = /^[a-fA-F0-9]{24}$/

function validateName(name, explain = 'name') {
  if (typeof name !== 'string' || !NAME_REGEX.test(name))
    throw new CredentialsError(`${explain} is not valid`)
}

// function validateArtisticName(artisticName, explain = 'artisticName') {
//   if (typeof username !== 'string' || !ARTISTIC_NAME_REGEX.test(artisticName))
//     throw new ContentError(`${explain} is not valid`)
// }

function validatePassword(password) {
  if (typeof password !== 'string' || !PASSWORD_REGEX.test(password))
    throw new ContentError('password is not valid')
}

function validatePasswordsMatch(password, passwordRepeat) {
  if (password !== passwordRepeat) throw new MatchError("passwords don't match")
}

function validateEmail(email) {
  if (typeof email !== 'string' || !EMAIL_REGEX.test(email))
    throw new CredentialsError('email is not valid')
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
  if (!ID_REGEX.test(id)) throw new ContentError(`${explain} is not valid`)
}

const validate = {
  name: validateName,
  //   artisticName: validateArtisticName,
  password: validatePassword,
  passwordsMatch: validatePasswordsMatch,
  email: validateEmail,
  callback: validateCallback,
  text: validateText,
  url: validateUrl,
  id: validateId,
}

export default validate
