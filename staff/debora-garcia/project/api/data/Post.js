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
    }]

})

const Post = model("Post", post)

export default Post