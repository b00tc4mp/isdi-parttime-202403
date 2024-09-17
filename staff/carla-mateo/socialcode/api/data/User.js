import { Schema, model } from 'mongoose'

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
})

const User = model('User', user)


export default User