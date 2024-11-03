import { Schema, model, Types } from "mongoose"

const { ObjectId } = Types



// const ratingSchema = new Schema({
//     user: {
//         type: ObjectId,
//         ref: 'User',
//         required: true
//     },
//     value: {
//         type: Number,
//         min: 1,
//         max: 5,
//         required: true
//     }
// })

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

    ingredients: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: {
            type: String,
            required: true,
            enum: ['grams', 'ml', 'l', 'tsp', 'unit']
        }
    }],

    description: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    /*ratings: [ratingSchema]*/

    likes: [{
        type: ObjectId,
        ref: 'User'
    }]

})

const Recipe = model('Recipe', recipe)

export default Recipe