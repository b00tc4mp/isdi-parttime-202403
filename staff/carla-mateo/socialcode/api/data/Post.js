import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const post = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
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
    comments: [{
        type: {
            author: {
                type: ObjectId,
                required: true,
                ref: 'User'
            },
            date: {
                type: Date,
                require: true,
                default: Date.now
            },
            comment: {
                type: String,
                require: true
            },
        }
    }],
    likes: [{
        type: ObjectId,
        ref: 'User'
    }]

})

const Post = model('Post', post)

export default Post