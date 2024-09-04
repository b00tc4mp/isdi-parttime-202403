import errors, { SystemError } from "com/errors"
import validate from "com/validate"

const getResult = (resultId) => {
    validate.id(resultId, "resultId")

    return fetch(`${import.meta.env.VITE_API_URL}/results/${resultId}`, {
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
                    .then(result => result)

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

export default getResult