import logic from './index.js'

try {
  logic.toggleLike("Batman", "6579928304009155-1718963293479", (error, postLiked) => {

    if (error) {
      console.error(error)

      return
    }

    if (postLiked) {
      console.log("post liked")
    } else {

      console.log("post not liked")
    }
  })

} catch (error) {
  console.error(error)
}
