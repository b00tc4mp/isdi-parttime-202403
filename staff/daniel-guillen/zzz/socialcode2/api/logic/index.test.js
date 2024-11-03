import logic from './index.js'

try {
    logic.authenticateUser('Pedro', 'Mapache', 'pedro@mapache.com', 'ElMapache', '123', '123', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('user authenticated')
    })
} catch (error) {
    console.error(error)
} 