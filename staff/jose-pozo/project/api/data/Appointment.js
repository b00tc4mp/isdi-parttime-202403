import { Schema, model } from 'mongoose'

const appointment = new Schema({
    date: {
        type: Date,
        required: true
    },

    time: {
        type: Date,
        required: true
    },

    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },

    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },

    provider: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    status: {
        type: String,
        enum: ['confirmed', 'pending', 'cancelled'],
        default: 'confirmed'
    },

    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
})

const Appointment = model('Appointment', appointment)

export default Appointment