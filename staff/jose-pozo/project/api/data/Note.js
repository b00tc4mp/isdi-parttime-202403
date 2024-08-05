import { Schema, model } from 'mongoose'

const note = new Schema({
    text: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    relatedTo: {
        type: Schema.Types.ObjectId,
        refPath: 'relatedToModel'
    },
    relatedToModel: {
        type: String,
        enum: ['Appointment', 'Customer', 'Service'],
        required: true
    }
})

const Note = model('Note', note)

export default Note
