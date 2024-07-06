import "dotenv/config"
import mongoose from "mongoose"

import getUsername from "./getUsername.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUsername("Mongo", "Mongo", (error, username) => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log("username retrieved", username)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))