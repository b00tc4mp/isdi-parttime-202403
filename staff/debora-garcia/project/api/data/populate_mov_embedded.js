import "dotenv/config"
import mongoose from "mongoose"
import { Workout } from "./index.js"
import { Movement } from "./index.js"

const { MONGODB_URL } = process.env

//Habria que modificar el modelo de datos para que workout tenga movement enbebido?

mongoose.connect(MONGODB_URL)
    .then(() => {
        const movementNames = ["Snatch", "Toes to bar", "Ground to overhead", "Pull ups", "DU's", "Burpees", "Power Clean", "Run", "Row"]
        const movements = movementNames.map(name => new Movement({ name }))

        return Promise.all(movements.map(movement => movement.save()))
            .then(savedMovements => {
                console.log("Movements inserted successfully")

                const snatchId = savedMovements.find(mov => mov.name === "Snatch")._id
                const toesToBarId = savedMovements.find(mov => mov.name === "Toes to bar")._id

                const workouts = [
                    new Workout({
                        workoutType: "emom",
                        movements: [
                            { movement: snatchId, weight: 60, repetitions: 15 },
                            { movement: toesToBarId, weight: 50, repetitions: 20 }
                        ],
                        duration: 20
                    }),
                    new Workout({
                        workoutType: "amrap",
                        movements: [
                            { movement: snatchId, weight: 20, repetitions: 20 }
                        ],
                        duration: 30
                    })
                ]

                return Promise.all(workouts.map(workout => workout.save()))
                    .then(() => console.log("Workouts saved successfully"))
            })
    })
    .catch(error => console.error(error))