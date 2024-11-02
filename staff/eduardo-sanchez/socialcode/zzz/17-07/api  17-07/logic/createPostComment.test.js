import "dotenv/config"
import mongoose from "mongoose"
import createPostComment from './createPostComment.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createPostComment("669937627831a5111aca71f0", "669935314ede473ff6cdfd8a", "Comment Testing")
                .then(() => {
                    console.log("Comment Created")
                })
                .catch((error) => {
                    console.error(error)
                })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))