import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const task = new Schema({
    owner: {
        type: ObjectId,
        ref: "User",
        required: true
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
        type: Boolean
    },
    observations: {
        type: String
    }
})

const Task = model('Task', task)

export default Task