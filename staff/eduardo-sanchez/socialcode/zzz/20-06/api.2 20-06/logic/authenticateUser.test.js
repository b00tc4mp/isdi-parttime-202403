import logic from './index.js'

try {
    logic.authenticateUser('peterpan', '123123123', error => {
    // logic.authenticateUser('dana', 'Hola1234', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('user authenticated')
    })
} catch (error) {
    console.error(error)
} 
