import errors, { SystemError } from "com/errors"
import validate from "../../../com/validate"

const addStudent = studentId => {
    validate.id(studentId, 'studentId')

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentId })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 201)
                return

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default addStudent