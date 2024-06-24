import logic from './index.js'

try {
    logic.deletePost("peterpan", "5838445445732432-1716838752497",
        error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post deleted')
        })
} catch (error) {
    console.error(error)
} 