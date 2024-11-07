import "dotenv/config"
import mongoose from "mongoose"

import deleteResult from "./deleteResult.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteResult("66abe056713a8be92f8e5844", "66bc9766ce4a3bbf015fb015")
                .then(() => console.log("result deleted"))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))