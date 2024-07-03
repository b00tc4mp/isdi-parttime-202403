import { Schema, model } from 'mongoose'

const user = new Schema({
    name: {
        type: String,
        required: true,
        match:/^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/
    },
    surname: {
        type: String,
        required: true,
        match:/^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    username: {
        type: String,
        required: true,
        unique: true,
        match:/^[\w-]+$/
    },
    password: {
        type: String,
        required: true,
    }
})

const User = model('User', user)

export default User