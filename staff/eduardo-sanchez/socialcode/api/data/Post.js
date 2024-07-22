import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const postcomment = new Schema({
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

    postcomments: { type: [postcomment] }

})

const Post = model('Post', post)

export default Post