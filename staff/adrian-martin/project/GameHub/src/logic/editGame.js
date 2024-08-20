import validate from "com/validate";
import errors, { SystemError } from "com/errors";
import extractPayloadFromJWT from "../util/extractPayloadFromJWT";

const editGame = (gameId, updates) => {
    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

    validate.id(gameId, 'gameId')

    if (updates.title) validate.text(updates.title)
    if (updates.image) validate.url(updates.image)
    if (updates.rating) validate.rating(updates.rating)
    if (updates.hours) validate.hours(updates.hours)


    return fetch(`${import.meta.env.VITE_API_URL}/games/${userId}/${gameId}/edit`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(updates)
    })
        .catch(() => { throw new SystemError('Connection error') })
        .then(response => {
            if (response.status === 200) return response.json()
            return response.json()
                .catch(() => { throw new SystemError('Connection error') })
                .then((body) => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}

export default editGame