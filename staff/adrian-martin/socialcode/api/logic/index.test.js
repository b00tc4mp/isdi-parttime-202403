import logic from "./index.js";

try {
    logic.registerUser('Adrian', 'adrian@gonzalo.com', 'AdrianGon', '123123123', error => {
        if (error) {
            console.log(error)

            return
        }
    })
} catch (error) {
    console.error(error)
}