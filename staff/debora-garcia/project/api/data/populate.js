import "dotenv/config"
import mongoose from "mongoose"
import { Workout } from "./index.js"
import { Movement } from "./index.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const snatch = new Movement({
            name: "Snatch",
            weight: 50,
            repetitions: 20,
            units: "kg"
        })

        const toesToBar = new Movement({
            name: "Toes to bar",
            weight: 50,
            repetitions: 20,
            units: "kg"
        })

        const groundToOverhead = new Movement({
            name: "Ground to overhead",
            weight: 50,
            repetitions: 20,
            units: "kg"
        })
        const pullUps = new Movement({
            name: "Pull ups",
            weight: 50,
            repetitions: 20,
            units: "kg"
        })
        const doubleUnders = new Movement({
            name: "DU's",
            weight: 50,
            repetitions: 20,
            units: "kg"
        })


        const burpees = new Movement({
            name: "Burpees",
            weight: 0,
            repetitions: 15,
            units: null
        })

        const cleans = new Movement({
            name: "Power Clean",
            weight: 30,
            repetitions: 15,
            units: null
        })
        const run = new Movement({
            name: "Run",
            weight: 0,
            repetitions: 100,
            units: "meters"
        })
        const row = new Movement({
            name: "Row",
            weight: 0,
            repetitions: 20,
            units: "cals"
        })


        return Promise.all([snatch.save(), burpees.save(), cleans.save(), run.save(), row.save()])
            .then(([snatch, burpees, row, run, cleans]) => {
                const wodEmom1 = new Workout({
                    workoutType: "emom",
                    movements: [snatch._id, burpees._id],
                    duration: 20
                })
                const wodEmom2 = new Workout({
                    workoutType: "emom",
                    movements: [cleans._id, burpees._id],
                    duration: 20
                })
                const wodEmom3 = new Workout({
                    workoutType: "emom",
                    movements: [row._id, run._id],
                    duration: 20
                })
                const workoutPromises = [wodEmom1.save(), wodEmom2.save(), wodEmom3.save()]

                return Promise.all(workoutPromises)
            })
            .then(() => console.log("Workout and movements inserted successfully"))
    })
    .catch(error => console.error(error))


