import { Schema, model } from 'mongoose'

const user = new Schema({
    name: {
        type: String,

    },
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

const User = model('User', user)


export default User