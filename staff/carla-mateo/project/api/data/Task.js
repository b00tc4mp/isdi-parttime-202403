import { Schema, model } from 'mongoose'

const { ObjectId } = Schema.Types

const task = new Schema({
    family: {
        type: String,
        required: true
    },
    assignee: {
        type: ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String

    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    done: [{
        type: ObjectId,
        ref: 'User'
    }],
    role: {
        type: String,
        enum: ['admin', 'user']
    },
})

const Task = model('Task', task)


export default Task