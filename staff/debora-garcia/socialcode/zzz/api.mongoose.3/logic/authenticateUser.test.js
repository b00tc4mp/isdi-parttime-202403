import "dotenv/config"
import mongoose from "mongoose"

import authenticateUser from "./authenticateUser.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            authenticateUser("LionLeo", "1234")
                .then(userId => console.log("user authenticated", userId))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

//add mongo db to api inject user collections in data; update register user and authenticate user logics to use mongo; update test and sh scripts for them #144