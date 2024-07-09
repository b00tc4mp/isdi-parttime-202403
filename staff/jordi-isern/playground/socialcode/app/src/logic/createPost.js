import errors, {SystemError} from 'com/errors'
import validate from 'com/validate'



const createPost =  (title, image, description, callback) => {
    validate.text(title, 'title', 50)
    validate.url(image, 'image')
    validate.text(description, 'description', 200)
    validate.callback(callback)


    fetch(`${import.meta.env.VITE_API_URL}/posts`), {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, image, description})
    }
    .then(response => {
        if(response.status === 201) {
            callback(null)

            return
        }
    })
}

export default createPost