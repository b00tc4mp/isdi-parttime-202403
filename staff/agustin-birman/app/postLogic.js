const postLogic = {}

postLogic.getAllPosts = () => {
    const posts = data.findPosts(() => true)

    return posts.reverse()
}

postLogic.createPost = (title, image, description) => {
    if (typeof title !== 'string' || !title.length)
        throw new ContentError('Title is not valid')
    if (title.length > 50)
        throw new ContentError('Title is too long (It should be less than 50 characters)')

    if (typeof image !== 'string' || !image.startsWith('http'))
        throw new ContentError('Image is not valid')

    if (typeof description !== 'string' || description.length > 250)
        throw new ContentError('Description is not valid')

    const post = {
        id: Date.now(),
        author: sessionStorage.username,
        title,
        image,
        description,
        date: viewLogic.getFullDateString(),
    }
    data.insterPost(post)
}

postLogic.deletePost = id => data.deletePost(post => post.id === id)