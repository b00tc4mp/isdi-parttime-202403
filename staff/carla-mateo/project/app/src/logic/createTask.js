import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const createTask = (family, assignee, title, description) => {
    validate.text(family, 'family')
    validate.text(title, 'title', 50)
    validate.text(description, 'description', 200)

    const body = JSON.stringify({ family, assignee, title, description })

    return fetch(`${import.meta.env.VITE_API_URL}/createtask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.token}`
        },
        body
    })
        .catch(() => { throw new SystemError('Server error') })
        .then(response => {
            if (response.status === 201) return


            return response.json()
                .catch(() => { throw new SystemError('Server error') })
                .then(body => {
                    const { error, message } = body

                    const ErrorConstructor = errors[error]

                    throw new ErrorConstructor(message)
                })
        })
}

export default createTask