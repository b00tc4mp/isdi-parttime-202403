import "dotenv/config"
import mongoose from "mongoose"

import getAllComments from "./getAllComments.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        getAllComments("66b0b8ff337c2b614a26583b", "66c9a2ab7327afe8d24678b1")
            .then((comments) => console.log("comments retrieved", comments))
            .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
