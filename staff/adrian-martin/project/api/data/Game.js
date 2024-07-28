import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const game = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    titleVideogame: {
        type: String,
        required: true
    },
    imageGame: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    hoursInTheGame: {
        type: Number,
        required: true
    }
})

const Game = model('Game', game)

export default Game