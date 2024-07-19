
import { ContentError, MatchError } from "./errors.js";

export const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/
export const USERNAME_REGEX = /^[\w-]+$/
export const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{4,}$/
export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const ID_REGEX = /^[0-9a-z-_]+$/i;

function validateName(name, explain = "name") {
  if (typeof name !== "string" || !NAME_REGEX.test(name)) {
    throw new ContentError(`❌ ${explain} is not valid ❌`)
  }
}

function validateUsername(username, explain = "username") {
  if (typeof username !== "string" || !USERNAME_REGEX.test(username)) {
    throw new ContentError(`❌ ${explain} is not valid ❌`)
  }
}

function validatePassword(password) {
  if (typeof password !== "string" || !PASSWORD_REGEX.test(password)) {
    throw new ContentError("❌ Password is not valid ❌")
  }
}

function validatePasswordsMatch(password, passwordRepeat) {
  if (password !== passwordRepeat) {
    throw new MatchError('passwords don\'t match')
  }
}

function validateEmail(email) {
  if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    throw new ContentError('email is not valid')
  }
}

function validateCallback(callback) {
  if (typeof callback !== "function") {
    throw new TypeError("callback is not a function")
  }
}

function validateText(text, explain = 'text', maxLength = Infinity) {
  if (typeof text !== 'string' || !text.length || text.length > maxLength) {
    throw new ContentError(`❌ ${explain} is not valid ❌`)
  }
}

function validateUrl(url, explain = 'url') {
  if (typeof url !== 'string' || !url.startsWith('http')) {
    throw new ContentError(`❌ ${explain} is not valid ❌`)
  }
}
function validateId(id, explain = 'id') {
  if (typeof id !== "string" || !ID_REGEX.test(id)) {
    throw new ContentError(`❌ ${explain} is not valid ❌`)
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
  id: validateId
}

export default validate