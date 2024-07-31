import { Schema, model } from 'mongoose'

const { ObjectId } = Schema.Types

const task = new Schema({
    title: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    parent: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
})

const Task = model('Task', task)


export default Task