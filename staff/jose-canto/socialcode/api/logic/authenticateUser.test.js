import logic from './index.js'

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
