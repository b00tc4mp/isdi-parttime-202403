import { Schema, model } from 'mongoose'

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
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

    name: {
        type: String
    },

    surname: {
        type: String
    },

    role: {
        type: String,
    },

    phone: {
        type: String
    },
})

const User = model('User', user)

export default User