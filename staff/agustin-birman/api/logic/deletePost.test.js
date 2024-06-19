import logic from "./index.js"



try {
    logic.deletePost('pepitogrillo', '8826114904894882-1716924151128', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('post deleted')
    })
} catch (error) {
    console.error(error)
}

