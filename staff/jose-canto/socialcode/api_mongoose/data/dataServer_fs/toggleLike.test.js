import data from "./index.js"

data.toggleLike("6579928304009155-1718963293479", "Batman", (error, postLiked) => {
  if (error) {
    console.error(error)
  }

  if (postLiked) {
    console.log("Post liked")
  } else {
    console.log("Post not liked")
  }
})