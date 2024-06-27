import logic from './index.js'

try {
    logic.getAllPosts("AdrianGon", (error, posts) => {
        if (error) {
            console.error(error)

            return
        }

        console.log('posts retrived', posts)
    })
} catch (error) {
    console.error(error)
}