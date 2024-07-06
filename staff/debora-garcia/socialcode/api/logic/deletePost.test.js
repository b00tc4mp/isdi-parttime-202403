import "dotenv/config"
import mongoose from "mongoose"

import deletePost from "./deletePost.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            deletePost("66863f2bea3bed4dd5940a5a", "668640e839d97916e8f3f342", error => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log("post deleted")
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
