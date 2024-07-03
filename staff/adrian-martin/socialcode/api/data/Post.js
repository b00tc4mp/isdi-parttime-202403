import { Schema, model } from 'mongoose'

const post = new Schema({
    author:{
        type: String,
        required: true
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
    data: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes:[{
        type: String,
    }]
})
const Post = model('Post', post)

export default Post