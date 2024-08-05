import { Schema, model } from 'mongoose'

const customer = new Schema({
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
    },

    phone: {
        type: String,
    },

    providers: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
})

const Customer = model('Customer', customer)

export default Customer