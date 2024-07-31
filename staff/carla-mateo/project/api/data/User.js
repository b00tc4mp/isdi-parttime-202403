import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

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
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'user'],

    },
    parent: {
        type: ObjectId,
        ref: 'User',
    },
})

const User = model('User', user)


export default User