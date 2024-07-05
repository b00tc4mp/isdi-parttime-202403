import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const post = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    titles: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true,
        default: Date.now
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }]

})

const Post = model('Post', post)

export default Post