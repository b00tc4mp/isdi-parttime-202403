import errors, { SystemError } from "com/errors"
import validate from "com/validate"

const createPost = (workoutId, image, description, time, repetitions, weight) => {
    validate.url(image, "image")
    validate.text(description, "description", 150)
    validate.number(time, "time");
    validate.number(repetitions, "repetitions");
    validate.number(weight, "weight");
 
    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${sessionStorage.token}`
        },
        body: JSON.stringify({ workoutId, image, description, time, repetitions, weight })
    })
        .catch(() => { throw new SystemError("server error") })
        .then(response => {
            if (response.status === 201) return
            return response.json()
                .catch(() => { throw new SystemError("server error") })
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })


}

export default createPost
