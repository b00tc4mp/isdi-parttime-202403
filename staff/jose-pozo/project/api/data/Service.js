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
        enum: ['Laser treatments', 'Aesthetic treatments']
    },

    duration: {
        type: Number,
        enum: [30, 60, 90, 120],
        required: true
    },

    price: {
        type: Number
    },

    provider: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Service = model('Service', service)

export default Service