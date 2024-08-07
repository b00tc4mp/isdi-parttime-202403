import "dotenv/config"
import mongoose from "mongoose"
import insertWorkout from "./insertWorkout.js"

const { MONGODB_URL } = process.env


mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        try {
            insertWorkout(
                "emom",
                [
                    { name: "Burpees", weight: 0, repetitions: 15 },
                    { name: "Snatch", weight: 100, repetitions: 20 }
                ],
                20)

                .then(() => console.log("workout inserted"))
                .catch(error => console.error(error))
            
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

