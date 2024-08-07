import { Workout } from "../data/index.js"
import { SystemError } from "com/errors.js"


const insertWorkout = (workoutType, movements, duration) => {
    const newWorkout = {
        workoutType,
        movements,
        duration,
    }

    return Workout.create(newWorkout)
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(() => { })
    
    /* .then(workoutInserted => {
        const workout = workoutInserted[0]
        const workoutId = workout._id.toString()

        delete workout._id;

        return workoutId;
    }) */
}

export default insertWorkout
