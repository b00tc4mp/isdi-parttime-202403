import { Schema, model, Types } from 'mongoose'
const { ObjectId } = Types

const user = new Schema({
    name: {
        type: String,
        required: true
    },
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
    profilePicture: {
        type: String
    },
    gameList: [{
        type: ObjectId,
        ref: 'Game'
    }],
    averageGrade: [{
        type: ObjectId,
        ref: 'User'
    }]
})

const User = model('User', user)

export default User