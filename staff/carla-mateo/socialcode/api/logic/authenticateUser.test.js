import logic from './index.js'

try {
    logic.authenticateUser('pepitogrillo', '1234', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('user authenticated')
    })

} catch (error) {
    console.error(error)
}