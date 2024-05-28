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

// logic.getAllPosts((error, posts) => {

//   if (error) {
//     console.error(error)

//     return
//   }

//   console.log(posts)

// })

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