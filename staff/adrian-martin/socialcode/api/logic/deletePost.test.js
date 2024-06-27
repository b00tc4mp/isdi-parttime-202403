import logic from './index.js'

try {
    logic.deletePost("AdrianGon", "9445498011651718-1718874167280", error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('posts deleted')
    })
} catch (error) {
    console.error(error)
}