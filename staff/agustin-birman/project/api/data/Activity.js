import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const activity = new Schema({
    teacher: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})

const Activity = model('Activity', activity)

export default Activity