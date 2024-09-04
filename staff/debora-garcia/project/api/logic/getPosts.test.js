import "dotenv/config"
import mongoose from "mongoose"

import getPosts from "./getPosts.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        getPosts("66b0b8ff337c2b614a26583b")
            .then(posts => console.log(posts))
            .catch(error => console.error(error))
    })
    .catch(error => console.error(error))