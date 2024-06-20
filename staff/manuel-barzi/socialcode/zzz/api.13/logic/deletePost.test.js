import logic from './index.js'

try {
    logic.deletePost('pepitogrillo', '2553895236558785-1717010042893', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('post deleted')
    })
} catch (error) {
    console.error(error)
} 