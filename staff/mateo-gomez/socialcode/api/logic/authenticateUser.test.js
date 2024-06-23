import logic from './index.js'


try {
    logic.authenticateUser('doncic', '123123123', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('user authenticated')
    })
} catch (error) {
    console.error(error)
}

