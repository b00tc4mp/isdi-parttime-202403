import logic from './index.js'

// try {
//     logic.registerUser('Adrian', 'Martin', 'adrian@martin.com', 'AdrianGon', '321321321', '321321321', error => {
//         if (error) {
//             console.error(error)

//             return
//         }

//         console.log('user registered')
//     })
// } catch (error) {
//     console.error(error)
// } 

try {
    logic.authenticateUser('AdrianGon', '321321321', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('user authenticated')
    })
} catch (error) {
    console.error(error)
} 

// logic.getAllPosts( (error, posts) => {
//     if(error) {
//         console.error(error)

//         return
//     }

//     console.log(posts)
// })

// logic.getUsername('Pepito', error => {
//     if(error){
//         console.error(error)

//         return
//     }

//     console.log(users)
// })