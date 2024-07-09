import errors, {SystemError} from 'com/errors'
import validate from 'com/validate'

const loginUser = (username, password, callback) => {
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    return  fetch(`${import.meta.env.VITE_API_URL}/users/auth`,{
        method: 'POST',
        headers:{
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password})
    })
    .catch(error => { throw new SystemError('network error')})
        .then(response => {
            if(response.status === 200){

                return response.json()
                    .catch(error => { throw new SystemError('network error')})      
                    .then(token =>{sessionStorage.token = token})
            }
            return response.json()
                .catch(error => { throw new SystemError('network error')})
                .then((body) => {
                    const {error, message} = body
                    const constructor = errors[error]
                    throw new constructor(message)
                } )
        })
        



}

export default loginUser