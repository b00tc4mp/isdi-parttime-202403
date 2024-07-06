import "dotenv/config"
import mongoose from "mongoose"

import getUsername from "./getUsername.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUsername("66863f2bea3bed4dd5940a5a", "66865633b5845c860adbb8cc", (error, username) => {
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