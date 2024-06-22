import logic from './index.js'

try {
  logic.toggleLike("Batman", "6579928304009155-1718963293479", (error) => {

    if (error) {
      console.error(error)

      return
    }

    console.log("post liked")
  })

} catch (error) {
  console.error(error)
}
