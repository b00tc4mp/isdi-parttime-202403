import { Schema, model, Types } from "mongoose"

const { ObjectId } = Types

const recipe = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    title: {
        type: String,
        required: true,
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
    }


})

const Recipe = model('Recipe', recipe)

export default Recipe