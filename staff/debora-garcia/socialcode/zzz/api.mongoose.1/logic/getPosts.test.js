import "dotenv/config"
import mongoose from "mongoose"

import getPosts from "./getPosts.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getPosts("RotoJaz", (error, posts) => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log("posts retrieved", posts)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))


