import logic from './index.js'

try {
    logic.registerUser('Pedro', 'Mapache', 'pedro@mapache.com', 'ElMapache', '123', '123', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('user registered')
    })
} catch (error) {
    console.error(error)
} 