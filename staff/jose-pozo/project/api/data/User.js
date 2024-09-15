import { Schema, model } from 'mongoose'

const user = new Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,

    },

    role: {
        type: String,
        enum: ['provider', 'customer'],
        required: true
    },

    phone: {
        type: String
    },

    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    active: {
        type: Boolean,
        default: true
    },

    providers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    appointments: [{
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    }],

    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }],

    services: [{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }]
}, {
    timestamps: true
})

const User = model('User', user)

export default User