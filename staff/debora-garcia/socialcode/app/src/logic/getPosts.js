import errors, { SystemError } from "com/errors"
import validate from "com/validate"

const getPosts = () => {

    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        //method; por defecto es un "GET", no hace falta especificarlo
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }

    })
        .catch(() => { throw new new SystemError("server error") })
        .then(response => {
            if (response.status === 200) {

                return response.json()
                    .catch(() => { throw new new SystemError("server error") })
                    .then(posts => posts)
            }
            return response.json()
                .catch(() => { throw new new SystemError("server error") })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })

}

export default getPosts
