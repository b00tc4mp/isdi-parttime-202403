import "dotenv/config"
import mongoose from "mongoose"

import getPosts from "./getPosts.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getPosts("668685aead5efafee5813100")
                .then(posts => console.log("posts retrieved", posts))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))


