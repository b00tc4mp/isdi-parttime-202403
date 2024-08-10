import "dotenv/config"
import mongoose from "mongoose"
import getUserName from "./getUserName.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserName("66b5d41339595da51246f298", "66b5d41339595da51246f298")
                .then((user) => {
                    console.log(`Name ${user} found`)
                })
                .catch((error) => console.error(error.message));
        } catch (error) {
            console.error(error.message)
        }

    })
    .catch((error) => console.error(error.message))