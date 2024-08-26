import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const answer = new Schema({
    student: {
        type: ObjectId,
        required: true
    },
    exercise: {
        type: ObjectId,
        required: true,
        unique: true
    },
    activity: {
        type: ObjectId,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})

const Answer = model('Answer', answer)

export default Answer

