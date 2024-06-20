import { ContentError, MatchError } from "./errors.js"

const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{4,}$/
const ID_REGEX = /^[0-9]+-[0-9]+$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


//validamos primero que sea un string

//como targetUsername y username validan lo mismo pero devuelven diferente mensaje de error usamos por defecto el valor username con el parametro explain.
function validateUsername(username, explain = "username") {
    if (typeof username !== "string" || !USERNAME_REGEX.test(username))
        throw new ContentError(`${explain} is not valid`)
}

function validatePassword(password) {
    if (typeof password !== "string" || !PASSWORD_REGEX.test(password))
        throw new ContentError("password is not valid")
}

function validatePasswordsMatch(password, passwordRepeat) {
    if (password !== passwordRepeat)
        throw new MatchError("passwords don't match")
}

function validateEmail(email) {
    if (typeof email !== "string" || !EMAIL_REGEX.test(email))
        throw new ContentError("email is not valid")
}

function validateCallback(callback) {
    if (typeof callback !== "function")
        throw new TypeError("callback is not a function")
}
//por defecto el max length es infinito, sino es el valor que se recive, si no se pasa nada siempre se cumpliria la condicion de abajo
function validateText(text, explain = "text", maxLength = Infinity) {
    if (typeof text !== "string" || !text.length || text.length > maxLength)
        throw new ContentError(`${explain} is not valid`)
}

//en la validacion de imagen usamos uno generico de url
function validateUrl(url, explain = "url") {
    if (typeof url !== "string" || !url.startsWith("http"))
        throw new ContentError(`${explain} is not valid`)
}

function validateId(id, explain = "id") {
    if (!ID_REGEX.test(id))
        throw new ContentError(`${explain} is not valid`)
}

const validate = {
    username: validateUsername,
    password: validatePassword,
    callback: validateCallback,
    passwordsMatch: validatePasswordsMatch,
    email: validateEmail,
    text: validateText,
    url: validateUrl,
    id: validateId

}

export default validate 