import logic from './index.js'

try {
    // logic.registerUser('Peter', 'Pan', 'peter@pan.com', 'peterpan', '123123123', '123123123', error => {
    
    // logic.registerUser('Wendy', 'Darling', 'wendy@darling.com', 'wendydarling', '123123123', '123123123', error => {
    
    logic.registerUser('Pablo', 'Picasso', 'pablo@picasso.com', 'PabloP', 'Hola1234', 'Hola1234', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('user registered')
    })
} catch (error) {
    console.error(error)
}
