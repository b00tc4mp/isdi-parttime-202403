import logic from './index.js'

try {
    logic.registerUser('Jason', 'Tatum', 'tatum@celtics.com', 'jasontatum', '123123123', '123123123', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('user registered')
    })
} catch (error) {
    console.error(error)
}

