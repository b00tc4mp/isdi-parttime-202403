import { Schema, model } from "mongoose"

const movement = new Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number
    },
    quantity: {
        type: Number,
        required: true
    },
    units: {
        type: String,
    }
})

const Movement = model("Movement", movement)

export default Movement