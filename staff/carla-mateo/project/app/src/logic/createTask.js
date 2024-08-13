import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const createTask = (title, description, assign) => {
    validate.text(title, 'title', 50)
    validate.text(description, 'description', 200)


    return fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.token}`
        },
        body: JSON.stringify({ title, description, assign })
    })
        .catch(() => { throw new SystemError('conection error') })
        .then(response => {
            if (response.status === 201) return

            return response.json()
                .catch(() => { throw new SystemError('conection error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default createTask