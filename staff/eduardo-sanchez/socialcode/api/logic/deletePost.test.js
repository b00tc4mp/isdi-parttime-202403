import logic from './index.js'

try {
    logic.deletePost('peterpan', '17164141890669127-1718895026735', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('post deleted')
    })
} catch (error) {
    console.error(error)
} 