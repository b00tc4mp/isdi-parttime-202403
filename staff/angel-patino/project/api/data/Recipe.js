import { Schema, model, Types } from "mongoose"

const { ObjectId } = Types

const ingredientSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: {
        type: String,
        required: true,
        enum: ['gr', 'ml', 'l', 'tsp', 'unit']
    }
})

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
    thumbnail: {
        type: String,
        required: true
    },

    cookTime: {
        type: Number,
        required: true
    },

    ingredients: {
        type: [ingredientSchema],
        required: true

    },

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