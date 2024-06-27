import { ContentError, MatchError } from "./errors.js"

const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w$%&=\[\]\{\}\<\>\(\)]{8,}$/
const ID_REGEX = /^[0-9a-z]+$/
const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


function validateUsername(username, explain = 'username'){
    if(!USERNAME_REGEX.test(username)){
        throw new ContentError(`${explain} is not valid`)
    }
}

function validatePasword(password){
    if(!PASSWORD_REGEX.test(password)){
        throw new ContentError('password is not valid')
    }
}

function validatePaswordsMatch( password, passwordRepeat){
    if (password !== passwordRepeat) {
        throw new MatchError('passwords don\'t match')
    }
}

function validateIDpost(postId){
    if(!ID_REGEX.test(postId)){
        throw new ContentError('postID is not valid')
    }
}

function validateCallback(callback){
    if(typeof callback !== 'function'){
        throw new TypeError('callback is not a function')
    }
}

function validateName(name, explain = 'name'){
    if (!NAME_REGEX.test(name)) {
        throw new ContentError(`${explain} is not valid`)
    }
}

function validateEmail (email){
    if (!EMAIL_REGEX.test(email)) {
        throw new ContentError('email is not valid')
    }
}

function validateText(text, explain ='text', maxLength = Infinity){
    if (typeof title !== 'string' || !title.length || text.length > maxLength){
        throw new ContentError(`${explain} is not valid`)
    }
}

function validateURL (url, explain = 'url') {
    if (typeof url !== 'string' || !url.startsWith('http')) {throw new ContentError(`${explain} is not valid`)}
}
const validate = {
    username: validateUsername,
    password: validatePasword,
    passwordMatch: validatePaswordsMatch,
    callback: validateCallback,
    name: validateName,
    id: validateIDpost,
    email: validateEmail,
    text: validateText,
    url: validateURL
}
export default validate