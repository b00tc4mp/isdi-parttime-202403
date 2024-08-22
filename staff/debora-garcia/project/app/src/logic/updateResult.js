import errors, { SystemError } from "com/errors"
import validate from "com/validate"
const updateResult = (resultId, time, repetitions, weight) => {
    validate.id(resultId, "resultId")
    validate.number(time, "time")
    validate.number(repetitions, "repetitions")
    validate.number(weight, "weight")

    return fetch(`${import.meta.env.VITE_API_URL}/results/${resultId}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${sessionStorage.token}`
        },
        body: JSON.stringify({ time, repetitions, weight })
    })
        .catch(() => { throw new SystemError("server error ") })
        .then(response => {
            if (response.status === 204) return

            return response.json()
                .catch(() => { throw new SystemError("server error") })
                .then((body) => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}

export default updateResult