import logic from './index.js'

try {
    logic.getUserName('wendy', 'wendy', (error, name) => {
        if (error) {
            console.error(error)

            return
        }

        console.log('user name retrieved', name)
    })
} catch (error) {
    console.error(error)
} 