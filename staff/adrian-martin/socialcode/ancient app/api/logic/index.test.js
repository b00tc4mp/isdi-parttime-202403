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

// try {
//     logic.authenticateUser('AdrianGon', '321321321', error => {
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

//         console.log('posts retrived', posts)
//     })
// } catch (error) {
//     console.error(error)
// }

// logic.getUsername('Pepito', error => {
//     if(error){
//         console.error(error)

//         return
//     }

//     console.log(users)
// })

// try {
//     logic.createPost('AdrianGon', 'smile4', 'https://imgs.search.brave.com/rY4vd7ChrTffot87xezWVyJZcsjp10UPNHx2EQMRCfs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFiL2Qx/L2I2LzFiZDFiNjE1/ZTZkYTcwZGQ3MWRj/ODRmZDJmNDdjODBk/LmpwZw', 'hi 2', error => {
//         if (error) {
//             console.error(error)

//             return
//         }

//         console.log('posts created')
//     })
// } catch (error) {
//     console.error(error)
// }

// try {
//     logic.deletePost('AdrianGon', '7956804321626201-1716989998965', error => {
//         if (error) {
//             console.error(error)

//             return
//         }

//         console.log('posts deleted')
//     })
// } catch (error) {
//     console.error(error)
// }

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