import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const adcomment = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const ad = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    geo: {
        type: String,
        required: true
    },

    adcomments: { type: [adcomment] }

})

const Ad = model('Ad', ad)

export default Ad