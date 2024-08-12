import { Schema, model } from 'mongoose'

const { ObjectId } = Schema.Types

const user = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    username: {
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
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'user']
    },
    parent: {
        type: ObjectId,
        ref: 'User',
    },
})

const User = model('User', user)


export default User