import { Schema, model, Types } from "mongoose"
const { ObjectId } = Types

const comment = new Schema({
    
    author: {
        type: String,
        ref: "User",
        required: true
    },
    post: {
        type: ObjectId,
        ref: "Post",
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

})

const Comment = model("Comment", comment)

export default Comment