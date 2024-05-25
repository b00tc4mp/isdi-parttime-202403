import logic from './index.js'

try {
    logic.registerUser('Adrian', 'Martin', 'adrian@martin.com', 'AdrianGon', '321321321', '321321321', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('user registered')
    })
} catch (error) {
    console.error(error)
} 