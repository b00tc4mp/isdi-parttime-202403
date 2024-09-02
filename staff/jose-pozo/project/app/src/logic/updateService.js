import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'


const updateService = (serviceId, serviceUpdated) => {
    validate.id(serviceId, 'serviceId')

    if (serviceUpdated.name) validate.text(serviceUpdated.name)
    if (serviceUpdated.description) validate.text(serviceUpdated.description)
    if (serviceUpdated.category) validate.text(serviceUpdated.category)
    if (serviceUpdated.duration) validate.number(serviceUpdated.duration)
    if (serviceUpdated.price) validate.number(serviceUpdated.price)

    return fetch(`${import.meta.env.VITE_API_URL}/services/${serviceId}`, {
        method: 'PATCH',

        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,

            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ serviceUpdated })
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

export default updateService

