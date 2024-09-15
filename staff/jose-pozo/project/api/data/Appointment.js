import { Schema, model } from 'mongoose'

const appointment = new Schema({
    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },


    provider: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    status: {
        type: String,
        enum: ['Confirmed', 'Pending', 'Cancelled']
    },

    active: {
        type: Boolean,
        default: true
    },

    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
}, {
    timestamps: true
})

const Appointment = model('Appointment', appointment)

export default Appointment