import { ContentError, MatchError } from "./errors.js"

// Regex para nombre (permitiendo letras y algunos caracteres especiales)
export const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/

// Regex para contraseña (letras, números, y algunos caracteres especiales, mínimo 4 caracteres)
export const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{4,}$/

// Regex para correo electrónico
export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Regex para teléfono (opcionalmente con prefijo internacional, varios formatos)
export const PHONE_REGEX = /^(\+?\d{1,4}?[-.\s]?)?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/

// Regex para ID (solo números y letras en minúsculas)
export const ID_REGEX = /^[0-9a-z]+$/

// Regex para región (solo Norte, Sur, Este, Oeste en mayúsculas y minúsculas)
export const REGION_REGEX = /^(Norte|Sur|Este|Oeste|norte|sur|este|oeste)$/

// Regex para precio mayor que 0 y divisa (USD, EUR, GBP, JPY)
export const PRICE_REGEX = /^(?!0$)(?:[1-9]\d*\.?\d*|\.\d+)\s*(USD|EUR|VES)$/

// Regex para disponibilidad (solo available o not available)
export const AVAILABILITY_REGEX = /^(available|not available)$/

// Regex para coordenadas (longitud y latitud)
export const LONGITUDE_REGEX = /^-?([1-9]?\d(\.\d+)?|1[0-7]\d(\.\d+)?|180(\.0+)?)$/
export const LATITUDE_REGEX = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/

function validateName(name, explain = 'name') {
  if (typeof name !== 'string' || !NAME_REGEX.test(name))
    throw new ContentError(`${explain} is not valid`)
}

function validatePassword(password) {
  if (typeof password !== 'string' || !PASSWORD_REGEX.test(password))
    throw new ContentError('password is not valid')
}

function validatePasswordsMatch(password, repeatPassword) {
  if (password !== repeatPassword)
    throw new MatchError('passwords don\'t match')
}

function validatePhone(phone) {
  if (typeof phone !== 'string' || !PHONE_REGEX.test(phone))
    throw new ContentError('phone number is not valid')
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



const validate = {
  name: validateName,
  password: validatePassword,
  passwordsMatch: validatePasswordsMatch,
  email: validateEmail,
  phone: validatePhone,
  callback: validateCallback,
  text: validateText,
  url: validateUrl,
  id: validateId,
}

export default validate