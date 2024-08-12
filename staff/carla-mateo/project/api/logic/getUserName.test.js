import "dotenv/config"
import mongoose from "mongoose"
import getUserName from "./getUserName.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserName("66b9d14f63b2d4c0bba66349", "66b9d14f63b2d4c0bba66349")
                .then((user) => {
                    console.log(`Name ${user.name} found and username ${user.username} found`)
                })
                .catch((error) => console.error(error.message));
        } catch (error) {
            console.error(error.message)
        }

    })
    .catch((error) => console.error(error.message))