import logic from './index.js'

// try {
//     logic.registerUser('Peter', 'Pan', 'peter@pan.com', 'peterpan', '123123123', '123123123', error => {
//         if (error) {
//             console.error(error)

//             return
//         }

//         console.log('user registered')
//     })
// } catch (error) {
//     console.error(error)
// }

// try {
//     logic.authenticateUser('pepitogrillo', '123123123', error => {
//         if (error) {
//             console.error(error)

//             return
//         }

//         console.log('user authenticated')
//     })
// } catch (error) {
//     console.error(error)
// } 

// try {
//     logic.getAllPosts((error, posts) => {
//         if (error) {
//             console.error(error)

//             return
//         }

//         console.log('posts retrieved', posts)
//     })
// } catch (error) {
//     console.error(error)
// } 

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