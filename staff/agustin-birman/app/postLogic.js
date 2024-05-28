const postLogic = {}

postLogic.getAllPosts = callback => {
    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 200) {
            const posts = JSON.parse(xhr.response)

            callback(null, posts)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.open('GET', 'http://localhost:8080/posts')

    xhr.send()
}

postLogic.createPost = (title, image, description, callback) => {
    if (typeof title !== 'string' || !title.length)
        throw new ContentError('Title is not valid')
    if (title.length > 50)
        throw new ContentError('Title is too long (It should be less than 50 characters)')
    if (typeof image !== 'string' || !image.startsWith('http'))
        throw new ContentError('Image is not valid')
    if (typeof description !== 'string' || description.length > 250)
        throw new ContentError('Description is not valid')

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 201) {
            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.open('POST', 'http://localhost:8080/posts')

    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)

    const body = {
        title,
        image,
        description
    }

    const json = JSON.stringify(body)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(json)
}

postLogic.deletePost = id => data.deletePost(post => post.id === id)