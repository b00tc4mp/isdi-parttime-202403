import logic from './index.js'

try {
    logic.getAllPosts('pepitogrillo', (error, posts) => {
        if (error) {
            console.error(error)

            return
        }

        console.log('posts retrieved', posts)
    })
} catch (error) {
    console.error(error)
}