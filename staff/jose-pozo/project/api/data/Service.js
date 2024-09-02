import { Schema, model } from 'mongoose'

const service = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    category: {
        type: String,
    },

    duration: {
        type: Number,
        enum: [15, 30, 45, 60, 75, 90, 105, 120],
        required: true
    },

    price: {
        type: Number
    },

    provider: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Service = model('Service', service)

export default Service