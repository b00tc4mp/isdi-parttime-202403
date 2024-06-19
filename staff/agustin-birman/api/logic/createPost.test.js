import logic from "./index.js"


try {
    logic.createPost('peterpan', 'hello world', 'https://miro.medium.com/v2/resize:fit:1024/1*OohqW5DGh9CQS4hLY5FXzA.png', 'console.log("hello world")', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('post created')
    })
} catch (error) {
    console.error(error)
}
