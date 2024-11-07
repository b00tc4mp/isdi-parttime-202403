import { Schema, Types, model } from "mongoose";
const { ObjectId } = Types

const workout = new Schema({
    workoutType: {
        type: String,
        enum: ["emom", "amrap", "for-time", "benchmark"],
        required: true
    },
    title: {
        type: String,
    },
    rounds: {
        type: Number
    },
    movements: [{
        type: ObjectId,
        ref: "Movement"
    }],
    duration: {
        type: Number,
    },
    description: {
        type: String
    }

})

const Workout = model("Workout", workout)

export default Workout


