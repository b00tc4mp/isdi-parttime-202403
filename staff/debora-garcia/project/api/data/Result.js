import { Schema, model, Types } from "mongoose"
const { ObjectId } = Types

const result = new Schema({
    workout: {
        type: ObjectId,
        required: true,
        ref: "Workout"
    },
    athlete: {
        type: ObjectId,
        required: true,
        ref: "User",
    },
    time: {
        type: Number,
    },
    repetitions: {
        type: Number,
    },
    weight: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
})

//TODO actualizar specs con el active

const Result = model("Result", result)

export default Result


