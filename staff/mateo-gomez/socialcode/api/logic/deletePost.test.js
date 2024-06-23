import logic from './index.js'


try {
    logic.deletePost("doncic", "09271547624393728-1718957021479", error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('post deleted')
    })
} catch (error) {
    console.error(error)
} 