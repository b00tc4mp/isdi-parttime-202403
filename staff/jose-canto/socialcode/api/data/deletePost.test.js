import data from "./index.js"

data.deletePost(post => post.id.includes("1716629444900"), (error, deletedPost) => {
  if (error) {
    console.error(error)
  }

  if (!deletedPost) {
    console.error("Post not found")
  } else {
    console.log(`Post with id: ${deletedPost.id} deleted`)
  }
})

