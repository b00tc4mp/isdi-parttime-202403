import { ContentError, MatchError } from './errors.js'

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/
const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{8,}$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const ID_REGEX = /^[0-9a-z]+$/
const INGREDIENT_NAME_REGEX = /^[a-zA-Z\s]+$/

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

function validateNumber(number, explain = 'number') {
    const min = 0;
    const max = 500;

    if (typeof number !== 'number' || isNaN(number) || number < min || number > max) {
        throw new ContentError(`${explain} is not valid. It must be a number between ${min} and ${max}.`)
    }
}

function validateIngredientArray(ingredients, explain = 'ingredients') {
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
        throw new ContentError(`${explain} must be a non-empty array.`);
    }

    ingredients.forEach((ingredient, index) => {
        if (typeof ingredient !== 'object' || ingredient === null) {
            throw new ContentError(`Ingredient at position ${index + 1} is not a valid object.`);
        }

        const { name, quantity, unit } = ingredient;

        if (typeof name !== 'string' || !INGREDIENT_NAME_REGEX.test(name)) {
            throw new ContentError(`Ingredient name at position ${index + 1} is not valid.`);
        }

        if (typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
            throw new ContentError(`Ingredient quantity at position ${index + 1} must be a positive number.`);
        }

        if (typeof unit !== 'string' || unit.trim().length === 0) {
            throw new ContentError(`Ingredient unit at position ${index + 1} cannot be empty.`);
        }
    })
}
// function validateRating(rating, explain = 'rating') {
//     const min = 1;
//     const max = 5;
//     if (typeof rating !== 'number' || isNaN(rating) || rating < min || rating > max) {
//         throw new ContentError(`${explain} must be a number between ${min} and ${max}.`);
//     }
// }

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
    number: validateNumber,
    ingredientArray: validateIngredientArray,
    // rating: validateRating
}

export default validate