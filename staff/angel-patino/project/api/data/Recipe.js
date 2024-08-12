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
        type: Number,
        required: true
    },

    ingredients: [{
        type: String,
        required: true
    }],

    description: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }]


})

const Recipe = model('Recipe', recipe)

export default Recipe