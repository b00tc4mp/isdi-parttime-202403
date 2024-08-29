import { Schema, model } from 'mongoose'

const { ObjectId } = Schema.Types

const task = new Schema({
    family: {
        type: String,
    },
    assignee: {
        type: ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
    },
    description: {
        type: String

    },
    date: {
        type: Date,
    },
    done: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['admin', 'user']
    },
})

const Task = model('Task', task)


export default Task