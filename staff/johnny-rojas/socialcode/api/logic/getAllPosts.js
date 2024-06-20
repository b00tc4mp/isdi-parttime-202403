import data from '../data/index.js'


const getAllPosts = callback => {
    data.findPosts(() => true, (error, posts) => {
        if (error) {
            callback(error)

            return
        }

        callback(null, posts.reverse())
    })
}

export default getAllPosts