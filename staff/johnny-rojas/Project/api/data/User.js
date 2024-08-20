import { NAME_REGEX, EMAIL_REGEX, PHONE_REGEX } from '../../com/validate.js'
import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types;

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
        match: PHONE_REGEX
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'guest',
        enum: ['guest', 'host'],
    },
    room: {
        type: ObjectId,
        ref:'Room'
    },
    isBlocked: {
        type: Boolean, 
        default: false
    }
})

const User = model('User', user)

export default User