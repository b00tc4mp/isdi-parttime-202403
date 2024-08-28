import errors, { SystemError } from "com/errors"
import validate from "com/validate"
const updateResult = (resultId, time, repetitions, weight) => {
    validate.id(resultId, "resultId")
    if (repetitions || repetitions === 0) validate.number(repetitions, "repetitions");
    if (weight || weight === 0) validate.number(weight, "weight");
    if (time || time === 0) validate.time(time, "time")

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
            if (response.status === 200) return

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