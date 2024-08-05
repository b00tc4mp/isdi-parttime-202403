import { Schema, model } from 'mongoose'

const user = new Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true

    },

    role: {
        type: String,
        enum: ['provider', 'customer'],
        default: 'provider'
    },

    phone: {
        type: String
    },
})

const User = model('User', user)

export default User