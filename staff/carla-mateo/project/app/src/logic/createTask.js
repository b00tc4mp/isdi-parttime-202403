import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const createTask = (assignee, title, description) => {
    validate.idAssignee(assignee, 'assignee')
    validate.text(title, 'title', 50)
    validate.text(description, 'description', 200)

    return fetch(`${import.meta.env.VITE_API_URL}/createtask`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.token}`
        },
        body: JSON.stringify({ assignee, title, description })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 201) return

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error] || SystemError

                    throw new constructor(message)
                })
        })
}

export default createTask