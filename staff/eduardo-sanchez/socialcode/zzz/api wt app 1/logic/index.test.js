import logic from './index.js'

// try {
//     logic.registerUser('Peter', 'Pan', 'peter@pan.com', 'peterpan', '123123123', '123123123', error => {
//         if (error) {
//             console.error(error)

//             return
//         }

//         console.log('user registered')
//     })
// } catch (error) {
//     console.error(error)
// } 


try {
    logic.authenticateUser('pepitogrillo', '123123123', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('user authenticated')
    })
} catch (error) {
    console.error(error)
} 