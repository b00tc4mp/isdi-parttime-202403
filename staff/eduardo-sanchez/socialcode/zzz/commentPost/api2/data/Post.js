import { Schema, model, Types } from 'mongoose'
// import PostComment from './PostComment.js'

const { ObjectId } = Types

const post = new Schema({
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
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],

    // postcomments: { type: [PostComment] }
})

const Post = model('Post', post)

export default Post