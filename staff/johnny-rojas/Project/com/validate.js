import { ContentError, MatchError } from "./errors.js"

export const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/

export const NAMEROOM_REGEX = /^[\w\s\-\_\@\.]{1,40}$/

export const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{4,}$/

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const PHONE_REGEX = /^\+?[1-9]\d{0,14}(\s?[\d-.\s]){4,15}$/;

export const ID_REGEX = /^[0-9a-z]+$/

export const REGION_REGEX = /^(Norte|Sur|Este|Oeste|norte|sur|este|oeste)$/

export const PRICE_REGEX = /^(?!0$)(?:[1-9]\d*\.?\d*|\.\d+)\s*(USD|EUR|VES)$/


function validateName(name, explain = 'name') {
  if (typeof name !== 'string' || !NAME_REGEX.test(name))
    throw new ContentError(`${explain} is not valid`)
}

function validateNameRoom(nameRoom, explain = 'name room') {
  if (typeof nameRoom !== 'string' || !NAMEROOM_REGEX.test(nameRoom)) {
    throw new ContentError(`${explain} is not valid`);
  }
}

function validatePassword(password) {
  if (typeof password !== 'string' || !PASSWORD_REGEX.test(password))
    throw new ContentError('password is not valid')
}

function validatePasswordsMatch(password, repeatPassword) {
  if (password !== repeatPassword)
    throw new MatchError('passwords don\'t match')
}

function validateEmail(email) {
  if (typeof email !== 'string' || !EMAIL_REGEX.test(email))
    throw new ContentError('email is not valid')
}

function validatePhone(phone) {
  if (typeof phone !== 'string' || !PHONE_REGEX.test(phone))
    throw new ContentError('phone number is not valid')
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

function validateRegion(region, explain = 'region') {
  if (typeof region !== 'string' || !REGION_REGEX.test(region)) {
    throw new ContentError(`${explain} is not valid`);
  }
}



const validate = {
  name: validateName,
  nameRoom: validateNameRoom,
  password: validatePassword,
  passwordsMatch: validatePasswordsMatch,
  email: validateEmail,
  phone: validatePhone,
  callback: validateCallback,
  text: validateText,
  url: validateUrl,
  id: validateId,
  region: validateRegion,
}

export default validate

