import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const task = new Schema({
    creator: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    owner: {
        type: ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    visible: {
        type: Boolean,
        required: true
    },
    observations: {
        type: String
    },
    completionTime: {
        type: Number
    }
})

const Task = model('Task', task)

export default Task