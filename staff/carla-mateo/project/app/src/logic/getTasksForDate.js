import errors, { SystemError } from 'com/errors'

import validate from 'com/validate'

const getTasksForDate = (date) => {
    validate.date(date, 'date')

    return fetch(`${import.meta.env.VITE_API_URL}/getTasks/${date.toISOString()}`, {

        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('conection error') })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError('conection error') })
                    .then(tasks => tasks)
            }

            return response.json()
                .catch(() => { throw new SystemError('conection error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default getTasksForDate