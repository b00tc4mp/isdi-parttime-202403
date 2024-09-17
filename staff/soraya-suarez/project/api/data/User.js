import { Schema, model } from 'mongoose'
const { ObjectId } = Schema.Types

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
    phone: {
        type: String
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    manager: {
        type: ObjectId,
        ref: "User"
    },
    available: {
        type: Boolean
    },
    password: {
        type: String,
        required: true
    }
})

const User = model('User', user)

export default User