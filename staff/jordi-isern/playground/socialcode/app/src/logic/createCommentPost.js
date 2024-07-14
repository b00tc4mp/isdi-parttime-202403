import errors, {SystemError} from 'com/errors'
import validate from 'com/validate'


const createPostComment = (postId, comment,) => {
    validate.text(comment, 'comment', 150)
    validate.id(postId)

    return fetch(`http://localhost:8080/posts/${postId}/comments`,{
        method: 'PATCH',
        headers:{
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/jason'
        },
        body: JSON.stringify({comment})
    })
        .catch(() =>{ throw new SystemError('server error')})
        .then(response => {
            if (response.status === 204) return

            return response.json()
                .catch(() => {throw new SystemError('server error')})
                .then(body => {
                    const{error, message} = body
                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}
export default createPostComment
