import { Schema, model, Types } from "mongoose";
const { ObjectId } = Types

const post = new Schema({

    author: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    image: {
        type: String
    },
    workout: {
        type: ObjectId,
        required: true,
        ref: "Workout"
    },
    result: {
        type: ObjectId,
        required: true,
        ref: "Result"
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],

    coments: [{
        type: {
            author: {
                type: String,
                ref: "User",
                required: true
            },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true,
                default: Date.now
            }
        }
    }]

})
//TODO ? hacer embebed doc con coments?
const Post = model("Post", post)

export default Post