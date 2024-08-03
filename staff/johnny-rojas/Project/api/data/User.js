import { NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX } from '../../com/validate.js'
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
    phone: {
        type: String,
        unique: true,
        match:PHONE_REGEX
    },
    password: {
        type: String,
        required: true,
    },
    // role: {
    //     type: String,
    //     required: true,
    //     default: 'guest',
    //     enum: ['guest', 'host']
    //   }
})

const User = model('User', user)

export default User