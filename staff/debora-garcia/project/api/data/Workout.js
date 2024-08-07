import { Schema, Types, model } from "mongoose";
const { ObjectId } = Types

const workout = new Schema({
    workoutType: {
        type: String,
        enum: ["emom", "amrap", "for-time", "benchmark"],
        required: true
    },
    movements: [{
        type: ObjectId,
        ref: "Movement"
    }],
    duration: {
        type: Number,
        required: true
    }
})

const Workout = model("Workout", workout)

export default Workout


