import { NAME_REGEX, USERNAME_REGEX, EMAIL_REGEX } from '../../com/validate.js'
import { Schema, model } from 'mongoose'

const user = new Schema({
    name: {
        type: String,
        required: true,
        match: NAME_REGEX
    },
    surname: {
        type: String,
        required: true,
        match: NAME_REGEX
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: EMAIL_REGEX
    },
    username: {
        type: String,
        required: true,
        unique: true,
        match: USERNAME_REGEX
    },
    password: {
        type: String,
        required: true
    }
})

const User = model('User', user)

export default User