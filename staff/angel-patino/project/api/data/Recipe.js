import { Schema, model, Types } from "mongoose"

const { ObjectId } = Types

const recipe = new Schema({

    title: {
        type: String,
        required: true,
    },

    link: {
        type: String,
        required: false,
    },

    source: {
        type: String,
        required: true,
    },

    thumbnail: {
        type: String,
        required: true
    },

    cookTime: {
        type: String,
        required: true
    },

    ingredients: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.nowº
    },

    rating: {
        type: Number,
        required: false
    },

    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
})

const Recipe = model('Recipe', recipe)

export default recipe