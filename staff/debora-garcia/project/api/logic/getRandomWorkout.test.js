import "dotenv/config"
import mongoose from "mongoose"

import getRandomWorkout from "./getRandomWorkout.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getRandomWorkout("66b0b8ff337c2b614a26583b", "emom")
                .then(randomWorkout => console.log(randomWorkout))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
