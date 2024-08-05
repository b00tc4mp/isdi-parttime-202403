import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const game = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    hours: {
        type: String,
        required: true
    }
})

const Game = model('Game', game)

export default Game