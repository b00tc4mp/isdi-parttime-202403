// import data from './index.js'

// data.deletePost(post => post.title === 'smile 2', error => {
//     if (error) {
//         console.error(error)

//         return
//     }

//     console.log('post deleted')
// })



import data from "./index.js"

data.deletePost(post => post.title === "smile 2", (error, deletedPost) => {
  if (error) {
    console.error(error)
  }

  if (!deletedPost) {
    console.error("Post not found")
  } else {
    console.log(`Post with title: ${deletedPost.title} deleted`)
  }
})

