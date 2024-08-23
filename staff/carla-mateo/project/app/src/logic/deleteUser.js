import errors, { SystemError } from "com/errors";
import validate from "com/validate";

const deleteProfile = (userId) => {
    validate.id(userId, 'userId')

    return fetch(`${import.meta.env.VITE_API_URL}/profile/${userId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        }
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 204) return

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })

}

export default deleteProfile