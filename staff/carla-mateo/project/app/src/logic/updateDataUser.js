import validate from "com/validate";
import errors, { SystemError } from "com/errors";

const editProfile = (userId, updates) => {
    validate.id(userId, 'userId')

    if (updates.username) {
        validate.username(updates.username)
    }

    if (updates.email) {
        validate.email(updates.email)
    }
    if (updates.avatar) {
        validate.avatar(updates.avatar)
    }

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/profile`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) return

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default editProfile