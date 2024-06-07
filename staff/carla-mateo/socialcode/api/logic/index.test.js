import logic from './index.js'

try {
    logic.registerUser('Peter', 'Pan', 'peter@pan.com', 'peterpan', '1234', '1234', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('user registered')
    })

} catch (error) {
    console.error(error)
}