import logic from './index.js'

// try {
//   logic.registerUser("Bruce", "Wayne", "batman@email.es", "batman", "1234", "1234", (error) => {

//     if (error) {
//       console.error(error)

//       return
//     }

//     console.log("User created")
//   })

// } catch (error) {
//   console.error(error)
// }

// ? ------------------------------------------------------------



// logic.getUserName((error, users) => {

//   if (error) {
//     console.error(error)
//     return
//   } else {
//     console.log(users)
//   }
// })

// ? ------------------------------------------------------------

try {
  logic.authenticateUser("Jack", "1234", (error, userFound) => {
    if (error) {

      console.error(error)

      return
    }

    console.log(`User ${userFound} authenticated`)
  })

} catch (error) {

  console.error(error)

}

// ? ------------------------------------------------------------

// try {
//   logic.getAllPosts((error, posts) => {

//     if (error) {
//       console.error(error)

//       return
//     }

//     console.log("posts retrieved", posts)
//   })

// } catch (error) {

//   console.error(error)
// }

// try {
//   logic.createPost("Jack", "hello World", "https://media.giphy.com/media/9FEMsCDEta9sL0GpKM/giphy.gif?cid=82a1493bf2ixl19i6a1ge1o8kpqdj1rbnkpc7k7xpvjn3mvj&ep=v1_gifs_trending&rid=giphy.gif&ct=g", "how are you?", (error) => {

//     if (error) {
//       console.error(error)

//       return
//     }

//     console.log("posts created")
//   })

// } catch (error) {

//   console.error(error)
// }