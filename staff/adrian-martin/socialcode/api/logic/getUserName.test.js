import logic from './index.js'

try {
    logic.getUserName('AdrianGon', 'AdrianGon', (error, name) => {
        if (error) {
            console.error(error)

            return
        }

        console.log('username retrived', name)
    })
} catch (error) {
    console.error(error)
}