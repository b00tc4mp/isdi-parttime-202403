import errors, { SystemError } from "com/errors"
import validate from "com/validate"

const getRandomWorkout = (workoutType) => {
    validate.type(workoutType, "workoutType")
    return fetch(`${import.meta.env.VITE_API_URL}/workouts/${workoutType}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError("server error") })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError("server error") })
                    .then(workoutRandom => workoutRandom)
            }
            return response.json()
                .catch(() => { throw new SystemError("server error") })
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}
        

export default getRandomWorkout