import { User, Workout } from "../data/index.js"
import { SystemError, NotFoundError } from "com/errors.js"
import validate from "com/validate.js"

const getRandomWorkout = (userId, workoutType) => {
    validate.id(userId, "userId")
    validate.type(workoutType, "workoutType")

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            return Workout.find({ workoutType }).select("-__v").populate("movements").lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(workouts => {
                    if (!workouts || workouts.length === 0) throw new NotFoundError("workouts not found")

                    const randomNumber = Math.floor(Math.random() * workouts.length)

                    const randomWorkout = workouts[randomNumber]

                    randomWorkout.id = randomWorkout._id.toString()
                    delete randomWorkout._id

                    if (!randomWorkout.movements) throw new NotFoundError("movements not found")

                    randomWorkout.movements = randomWorkout.movements.map(movement => {

                        movement.id = movement._id.toString()
                        delete movement._id
                        return movement
                    })
                    return randomWorkout
                })

        })
}
export default getRandomWorkout
